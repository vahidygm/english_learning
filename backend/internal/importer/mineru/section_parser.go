package mineru

type SectionParser struct {
	exerciseParser *ExerciseParser
}

func NewSectionParser() *SectionParser {
	return &SectionParser{
		exerciseParser: NewExerciseParser(),
	}
}

func (p *SectionParser) Parse(blocks []ClassifiedBlock) []ParsedSection {

	var sections []ParsedSection

	var current *ParsedSection
	var sectionBlocks []ClassifiedBlock

	flush := func() {

		if current == nil {
			return
		}

		current.Exercises = p.exerciseParser.Parse(sectionBlocks)

		sections = append(sections, *current)

		sectionBlocks = nil
	}

	for _, block := range blocks {

		if name, ok := p.sectionName(block.Kind); ok {

			flush()

			current = &ParsedSection{
				Name: name,
			}

			continue
		}

		if current == nil {
			continue
		}

		sectionBlocks = append(sectionBlocks, block)
	}

	flush()

	for i := range sections {
		sections[i].Order = i
	}

	return sections
}

func (p *SectionParser) sectionName(kind BlockKind) (string, bool) {

	switch kind {

	case BlockListening:
		return SectionListening, true

	case BlockReading:
		return SectionReading, true

	case BlockGrammar:
		return SectionGrammar, true

	case BlockVocabulary:
		return SectionVocabulary, true

	case BlockPronunciation:
		return SectionPronunciation, true

	case BlockWriting:
		return SectionWriting, true

	case BlockHowTo:
		return SectionHowTo, true

	case BlockBBC:
		return SectionBBC, true
	}

	return "", false
}

func (p *SectionParser) HasSections(blocks []ClassifiedBlock) bool {

	for _, block := range blocks {

		if _, ok := p.sectionName(block.Kind); ok {
			return true
		}
	}

	return false
}

func (p *SectionParser) Split(blocks []ClassifiedBlock) map[string][]ClassifiedBlock {

	result := make(map[string][]ClassifiedBlock)

	var current string

	for _, block := range blocks {

		if name, ok := p.sectionName(block.Kind); ok {

			current = name

			if _, exists := result[current]; !exists {
				result[current] = []ClassifiedBlock{}
			}

			continue
		}

		if current == "" {
			continue
		}

		result[current] = append(result[current], block)
	}

	return result
}