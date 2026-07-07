package mineru

type UnitParser struct {
	metadataParser *MetadataParser
	sectionParser  *SectionParser
}

func NewUnitParser() *UnitParser {
	return &UnitParser{
		metadataParser: NewMetadataParser(),
		sectionParser:  NewSectionParser(),
	}
}

//
// Parse one unit from classified blocks
//

func (p *UnitParser) Parse(unit UnitRange) ParsedUnit {

	var parsed ParsedUnit

	parsed.Code = unit.Code
	parsed.Title = unit.Title

	//--------------------------------------------------
	// 1. Metadata
	//--------------------------------------------------

	meta := p.metadataParser.Parse(unit.Blocks)

	parsed.Metadata = meta

	//--------------------------------------------------
	// 2. Sections
	//--------------------------------------------------

	if p.sectionParser.HasSections(unit.Blocks) {

		parsed.Sections = p.sectionParser.Parse(unit.Blocks)

		return parsed
	}

	//--------------------------------------------------
	// 3. Fallback (no explicit sections)
	//--------------------------------------------------

	section := ParsedSection{
		Name:  "GENERAL",
		Order: 0,
	}

	exercises := NewExerciseParser().Parse(unit.Blocks)

	section.Exercises = exercises

	parsed.Sections = []ParsedSection{section}

	return parsed
}

//
// Parse multiple units
//

func (p *UnitParser) ParseMany(units []UnitRange) []ParsedUnit {

	var result []ParsedUnit

	for _, u := range units {
		result = append(result, p.Parse(u))
	}

	return result
}

//
// Validate unit integrity
//

func (p *UnitParser) Validate(unit ParsedUnit) bool {

	if unit.Code == "" {
		return false
	}

	if len(unit.Sections) == 0 {
		return false
	}

	return true
}