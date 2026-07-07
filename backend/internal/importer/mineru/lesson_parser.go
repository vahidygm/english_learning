package mineru

type LessonParser struct {
	unitDetector *UnitDetector
	unitParser   *UnitParser
}

func NewLessonParser() *LessonParser {
	return &LessonParser{
		unitDetector: NewUnitDetector(),
		unitParser:   NewUnitParser(),
	}
}

//
// Parse full lesson from MinerU document
//

func (p *LessonParser) Parse(doc *Document) ParsedLesson {

	var lesson ParsedLesson

	//--------------------------------------------------
	// 1. Flatten + classify all blocks
	//--------------------------------------------------

	rawBlocks := doc.Blocks()

	classified := make([]ClassifiedBlock, 0, len(rawBlocks))

	for _, b := range rawBlocks {
		classified = append(classified, ClassifyBlock(b))
	}

	//--------------------------------------------------
	// 2. Detect units
	//--------------------------------------------------

	unitRanges := p.unitDetector.Detect(classified)

	//--------------------------------------------------
	// 3. Parse units
	//--------------------------------------------------

	units := p.unitParser.ParseMany(unitRanges)

	lesson.Units = units

	//--------------------------------------------------
	// 4. Extract lesson-level metadata
	//--------------------------------------------------

	lesson.Title = p.extractLessonTitle(classified)

	lesson.Number = p.extractLessonNumber(classified)

	lesson.Objectives = p.extractObjectives(classified)

	return lesson
}

//
// Parse multiple lessons (optional batch mode)
//

func (p *LessonParser) ParseMany(docs []*Document) []ParsedLesson {

	var result []ParsedLesson

	for _, doc := range docs {
		result = append(result, p.Parse(doc))
	}

	return result
}

//
// Lesson title detection
//

func (p *LessonParser) extractLessonTitle(blocks []ClassifiedBlock) string {

	for _, b := range blocks {

		if b.Kind == BlockLessonCover {
			return NormalizeInline(b.Text)
		}
	}

	// fallback: first unit title suffix
	for _, b := range blocks {

		if b.Kind == BlockUnitTitle {
			return b.UnitTitle
		}
	}

	return ""
}

//
// Lesson number detection
//

func (p *LessonParser) extractLessonNumber(blocks []ClassifiedBlock) int {

	for _, b := range blocks {

		if b.Kind == BlockUnitTitle {
			// unit code like 1A → lesson number 1
			if len(b.UnitCode) > 0 {
				return int(b.UnitCode[0] - '0')
			}
		}
	}

	return 0
}

//
// Learning objectives extraction
//

func (p *LessonParser) extractObjectives(blocks []ClassifiedBlock) []ParsedObjective {

	var objectives []ParsedObjective

	var current ParsedObjective

	inObjectives := false

	for _, b := range blocks {

		if b.Kind == BlockLessonObjectives {
			inObjectives = true
			continue
		}

		if !inObjectives {
			continue
		}

		// stop when units start
		if b.Kind == BlockUnitTitle {
			break
		}

		text := NormalizeInline(b.Text)

		if text == "" {
			continue
		}

		switch {

		case containsAnyUpper(text, []string{"GRAMMAR"}):
			current.Grammar = text

		case containsAnyUpper(text, []string{"VOCABULARY"}):
			current.Vocabulary = text

		case containsAnyUpper(text, []string{"PRONUNCIATION"}):
			current.Pronunciation = text

		case containsAnyUpper(text, []string{"WRITING"}):
			current.Writing = text

		default:
			current.Skill = text
		}
	}

	if current.Skill != "" ||
		current.Grammar != "" ||
		current.Vocabulary != "" {

		objectives = append(objectives, current)
	}

	return objectives
}

//
// helper
//

func containsAnyUpper(text string, keys []string) bool {

	for _, k := range keys {
		if containsUpper(text, k) {
			return true
		}
	}

	return false
}

func containsUpper(text, key string) bool {

	return len(text) >= len(key) &&
		stringContains(toUpper(text), key)
}

func toUpper(s string) string {
	// minimal inline upper (avoid importing strings repeatedly)
	out := []rune(s)
	for i := range out {
		if out[i] >= 'a' && out[i] <= 'z' {
			out[i] -= 32
		}
	}
	return string(out)
}

func stringContains(s, sub string) bool {
	for i := 0; i+len(sub) <= len(s); i++ {
		if s[i:i+len(sub)] == sub {
			return true
		}
	}
	return false
}