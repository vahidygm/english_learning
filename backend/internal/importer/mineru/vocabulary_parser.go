package mineru

import (
	"strings"
)

type VocabularyParser struct{}

func NewVocabularyParser() *VocabularyParser {
	return &VocabularyParser{}
}

//
// Parse vocabulary from table + text blocks
//

func (p *VocabularyParser) Parse(blocks []ClassifiedBlock, tables []ParsedTable) []ParsedVocabulary {

	var vocab []ParsedVocabulary

	//------------------------------------------------------
	// 1. Parse from tables
	//------------------------------------------------------

	for _, table := range tables {

		if !p.isVocabularyTable(table) {
			continue
		}

		vocab = append(vocab, p.parseTable(table)...)
	}

	//------------------------------------------------------
	// 2. Parse from text blocks
	//------------------------------------------------------

	for _, block := range blocks {

		if block.Kind != BlockVocabulary {
			continue
		}

		vocab = append(vocab, p.parseText(block)...)
	}

	return vocab
}

//
// Table parsing
//

func (p *VocabularyParser) parseTable(table ParsedTable) []ParsedVocabulary {

	var result []ParsedVocabulary

	if len(table.Rows) == 0 {
		return nil
	}

	// assume first row is header
	start := 1

	for i := start; i < len(table.Rows); i++ {

		row := table.Rows[i]

		if len(row) < 2 {
			continue
		}

		word := strings.TrimSpace(row[0])
		meaning := strings.TrimSpace(row[1])

		example := ""

		if len(row) > 2 {
			example = strings.TrimSpace(row[2])
		}

		if word == "" {
			continue
		}

		result = append(result, ParsedVocabulary{
			Word:     word,
			Meaning:  meaning,
			Example:  example,
			Order:    i,
			Category: "table",
		})
	}

	return result
}

//
// Text parsing
//

func (p *VocabularyParser) parseText(block ClassifiedBlock) []ParsedVocabulary {

	var result []ParsedVocabulary

	text := Normalize(block.Text)

	lines := strings.Split(text, "\n")

	for i, line := range lines {

		line = strings.TrimSpace(line)

		if line == "" {
			continue
		}

		// Format: word - meaning
		if strings.Contains(line, "-") {

			parts := strings.SplitN(line, "-", 2)

			word := strings.TrimSpace(parts[0])
			meaning := strings.TrimSpace(parts[1])

			if word == "" {
				continue
			}

			result = append(result, ParsedVocabulary{
				Word:     word,
				Meaning:  meaning,
				Order:    i,
				Category: "text",
			})

			continue
		}

		// fallback: single word line
		result = append(result, ParsedVocabulary{
			Word:     line,
			Meaning:  "",
			Order:    i,
			Category: "text",
		})
	}

	return result
}

//
// Helpers
//

func (p *VocabularyParser) isVocabularyTable(table ParsedTable) bool {

	if len(table.Rows) == 0 {
		return false
	}

	header := strings.ToLower(strings.Join(table.Rows[0], " "))

	return strings.Contains(header, "word") ||
		strings.Contains(header, "meaning") ||
		strings.Contains(header, "translation") ||
		strings.Contains(header, "country") ||
		strings.Contains(header, "city") ||
		strings.Contains(header, "name")
}

//
// Check if block is vocabulary-related
//

func (p *VocabularyParser) LooksLikeVocabulary(block ClassifiedBlock) bool {

	text := strings.ToLower(block.Text)

	return strings.Contains(text, "vocabulary") ||
		strings.Contains(text, "words") ||
		strings.Contains(text, "match") ||
		strings.Contains(text, "translate")
}