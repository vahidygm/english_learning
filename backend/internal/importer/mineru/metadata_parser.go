package mineru

import (
	"strings"
)

type MetadataParser struct{}

func NewMetadataParser() *MetadataParser {
	return &MetadataParser{}
}

//
// Parse unit-level metadata from blocks
//

func (p *MetadataParser) Parse(blocks []ClassifiedBlock) ParsedMetadata {

	meta := ParsedMetadata{}

	for _, b := range blocks {

		if b.Kind != BlockMetadata {
			continue
		}

		text := NormalizeInline(b.Text)

		lines := strings.Split(text, "\n")

		for _, line := range lines {

			line = NormalizeInline(line)

			if line == "" {
				continue
			}

			switch {

			case strings.HasPrefix(strings.ToUpper(line), KeywordGrammar):

				meta.Grammar = extractValue(line)

			case strings.HasPrefix(strings.ToUpper(line), KeywordVocabulary):

				meta.Vocabulary = extractValue(line)

			case strings.HasPrefix(strings.ToUpper(line), KeywordPronunciation):

				meta.Pronunciation = extractValue(line)

			case strings.HasPrefix(strings.ToUpper(line), KeywordWriting):

				meta.Writing = extractValue(line)
			}
		}
	}

	return meta
}

//
// extract value after "|"
//

func extractValue(line string) string {

	idx := strings.Index(line, "|")

	if idx == -1 {
		return strings.TrimSpace(line)
	}

	return strings.TrimSpace(line[idx+1:])
}

//
// Merge metadata (useful when split across pages)
//

func (p *MetadataParser) Merge(a, b ParsedMetadata) ParsedMetadata {

	if b.Grammar != "" {
		a.Grammar = b.Grammar
	}

	if b.Vocabulary != "" {
		a.Vocabulary = b.Vocabulary
	}

	if b.Pronunciation != "" {
		a.Pronunciation = b.Pronunciation
	}

	if b.Writing != "" {
		a.Writing = b.Writing
	}

	return a
}

//
// Validate completeness
//

func (p *MetadataParser) IsEmpty(meta ParsedMetadata) bool {

	return meta.Grammar == "" &&
		meta.Vocabulary == "" &&
		meta.Pronunciation == "" &&
		meta.Writing == ""
}