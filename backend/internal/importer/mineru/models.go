package mineru

import (
	"encoding/json"
	"os"
	"strings"
)

//
// Root Document
//

type Document struct {
	PDFInfo []Page `json:"pdf_info"`
}

//
// Page
//

type Page struct {
	PageIndex int `json:"page_idx"`

	Blocks []Block `json:"para_blocks"`
}

//
// Generic Block
//

type Block struct {
	Type  string `json:"type"`
	Level int    `json:"level,omitempty"`

	BBox []float64 `json:"bbox,omitempty"`

	Lines  []Line  `json:"lines,omitempty"`
	Blocks []Block `json:"blocks,omitempty"`
}

//
// Line
//

type Line struct {
	Spans []Span `json:"spans"`
}

//
// Span
//

type Span struct {
	Type string `json:"type"`

	Content string `json:"content,omitempty"`

	ImagePath string `json:"image_path,omitempty"`

	HTML string `json:"html,omitempty"`
}

//
// Loader
//

func Load(path string) (*Document, error) {

	data, err := os.ReadFile(path)
	if err != nil {
		return nil, err
	}

	var doc Document

	err = json.Unmarshal(data, &doc)
	if err != nil {
		return nil, err
	}

	return &doc, nil
}

//
// Document Helpers
//

func (d *Document) Pages() []Page {
	return d.PDFInfo
}

func (d *Document) Blocks() []Block {

	var blocks []Block

	for _, page := range d.PDFInfo {
		blocks = append(blocks, page.AllBlocks()...)
	}

	return blocks
}

//
// Page Helpers
//

func (p *Page) AllBlocks() []Block {

	var result []Block

	for _, b := range p.Blocks {
		result = append(result, flatten(b)...)
	}

	return result
}

//
// Block Helpers
//

func flatten(b Block) []Block {

	result := []Block{b}

	for _, child := range b.Blocks {
		result = append(result, flatten(child)...)
	}

	return result
}

func (b Block) Text() string {

	var parts []string

	for _, line := range b.Lines {

		for _, span := range line.Spans {

			if span.Type != "text" {
				continue
			}

			text := strings.TrimSpace(span.Content)

			if text == "" {
				continue
			}

			parts = append(parts, text)
		}
	}

	return strings.Join(parts, "\n")
}

func (b Block) HTML() string {

	for _, line := range b.Lines {

		for _, span := range line.Spans {

			if span.HTML != "" {
				return span.HTML
			}
		}
	}

	return ""
}

func (b Block) Image() string {

	for _, line := range b.Lines {

		for _, span := range line.Spans {

			if span.ImagePath != "" {
				return span.ImagePath
			}
		}
	}

	return ""
}

func (b Block) AudioTrack() string {

	text := b.Text()

	return AudioTrackRegex.FindString(text)
}

func (b Block) HasText() bool {
	return b.Text() != ""
}

func (b Block) HasImage() bool {
	return b.Image() != ""
}

func (b Block) HasHTML() bool {
	return b.HTML() != ""
}

func (b Block) HasAudio() bool {
	return b.AudioTrack() != ""
}

func (b Block) IsTitle() bool {
	return b.Type == BlockTypeTitle
}

func (b Block) IsText() bool {
	return b.Type == BlockTypeText
}

func (b Block) IsImage() bool {
	return b.Type == BlockTypeImage
}

func (b Block) IsTable() bool {
	return b.Type == BlockTypeTable
}

//
// Walk Blocks
//

func (d *Document) Walk(fn func(page int, block Block)) {

	for _, page := range d.PDFInfo {

		for _, block := range page.AllBlocks() {
			fn(page.PageIndex, block)
		}
	}
}

//
// Search Helpers
//

func (d *Document) FindBlocks(kind BlockKind) []Block {

	var result []Block

	d.Walk(func(page int, block Block) {

		if Classify(block) == kind {
			result = append(result, block)
		}

	})

	return result
}

func (d *Document) FindUnitTitles() []Block {
	return d.FindBlocks(BlockUnitTitle)
}

func (d *Document) FindLessonObjectives() []Block {
	return d.FindBlocks(BlockLessonObjectives)
}

//
// Normalize
//

func NormalizeText(s string) string {

	s = strings.ReplaceAll(s, "\r", "")
	s = strings.ReplaceAll(s, "\t", " ")

	for strings.Contains(s, "  ") {
		s = strings.ReplaceAll(s, "  ", " ")
	}

	return strings.TrimSpace(s)
}