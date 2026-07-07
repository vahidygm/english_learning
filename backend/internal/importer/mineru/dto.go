package mineru

//
// Root
//

type ParsedLesson struct {
	Number     int
	Title      string
	CoverImage string

	Objectives []ParsedObjective
	Units      []ParsedUnit
}

//
// Learning Objectives
//

type ParsedObjective struct {
	UnitCode string

	Skill string

	Grammar string

	Vocabulary string

	Pronunciation string

	Writing string
}

//
// Unit
//

type ParsedUnit struct {
	Code  string
	Title string

	Metadata ParsedMetadata

	Sections []ParsedSection
}

//
// Metadata
//

type ParsedMetadata struct {
	Grammar string

	Vocabulary string

	Pronunciation string

	Writing string
}

//
// Section
//

type ParsedSection struct {
	Name  string
	Order int

	Exercises []ParsedExercise
}

//
// Exercise
//

type ParsedExercise struct {

	// Exercise number in the book.
	// Example: "1", "2", "3"
	Number string

	// Optional title.
	Title string

	// listening, grammar, reading, vocabulary...
	Type string

	Order int

	// Main instruction.
	// Example:
	// "Listen and complete the table."
	Instruction string

	// Additional notes.
	Notes []string

	// Audio tracks (1.01, 2.04...)
	AudioTracks []string

	Questions []ParsedQuestion

	Dialogues []ParsedDialogue

	Vocabulary []ParsedVocabulary

	Grammar []ParsedGrammar

	Pronunciation []ParsedPronunciation

	Tables []ParsedTable

	Media []ParsedMedia
}

//
// Question
//

type ParsedQuestion struct {
	Number string

	Text string

	Answer string

	Order int
}

//
// Dialogue
//

type ParsedDialogue struct {
	Title string

	Lines []ParsedDialogueLine
}

type ParsedDialogueLine struct {
	Speaker string

	Text string

	Order int
}

//
// Vocabulary
//

type ParsedVocabulary struct {
	Category string

	Word string

	Meaning string

	Example string

	Order int
}

//
// Grammar
//

type ParsedGrammar struct {
	Topic string

	Rule string

	Example string

	Order int
}

//
// Pronunciation
//

type ParsedPronunciation struct {
	Topic string

	Text string

	IPA string

	AudioTrack string

	Order int
}

//
// Table
//

type ParsedTable struct {
	Title string

	HTML string

	Rows [][]string
}

//
// Media
//

type ParsedMedia struct {
	Type string

	URL string

	Caption string

	Order int
}

//
// Parser Context
//

type ParseContext struct {
	Lesson *ParsedLesson

	CurrentUnit *ParsedUnit

	CurrentSection *ParsedSection

	CurrentExercise *ParsedExercise

	Page int
}