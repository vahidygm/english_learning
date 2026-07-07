package mineru

import "regexp"

//
// Block Types (MinerU)
//

const (
	BlockTypeTitle = "title"
	BlockTypeText  = "text"
	BlockTypeImage = "image"
	BlockTypeTable = "table"
)

//
// Semantic Block Types
//

type BlockKind string

const (

	// Unknown
	BlockUnknown BlockKind = "unknown"

	// Lesson
	BlockLessonCover       BlockKind = "lesson_cover"
	BlockLessonObjectives  BlockKind = "lesson_objectives"

	// Unit
	BlockUnitTitle BlockKind = "unit_title"

	// Section Headers
	BlockListening     BlockKind = "listening"
	BlockReading       BlockKind = "reading"
	BlockGrammar       BlockKind = "grammar"
	BlockVocabulary    BlockKind = "vocabulary"
	BlockPronunciation BlockKind = "pronunciation"
	BlockWriting       BlockKind = "writing"
	BlockHowTo         BlockKind = "how_to"
	BlockBBC           BlockKind = "bbc"

	// Content
	BlockExercise   BlockKind = "exercise"
	BlockDialogue   BlockKind = "dialogue"
	BlockInstruction BlockKind = "instruction"
	BlockTable      BlockKind = "table"
	BlockImage      BlockKind = "image"

	// Metadata
	BlockMetadata BlockKind = "metadata"

	// References
	BlockReference BlockKind = "reference"
)

//
// Section Names
//

const (
	SectionListening     = "LISTENING"
	SectionReading       = "READING"
	SectionGrammar       = "GRAMMAR"
	SectionVocabulary    = "VOCABULARY"
	SectionPronunciation = "PRONUNCIATION"
	SectionWriting       = "WRITING"
	SectionHowTo         = "HOW TO"
	SectionBBC           = "BBC"
)

//
// Metadata Keywords
//

const (
	KeywordGrammar       = "GRAMMAR"
	KeywordVocabulary    = "VOCABULARY"
	KeywordPronunciation = "PRONUNCIATION"
	KeywordWriting       = "WRITING"
)

//
// Exercise Keywords
//

var ExerciseKeywords = []string{
	"Complete",
	"Match",
	"Listen",
	"Read",
	"Write",
	"Circle",
	"Choose",
	"Tick",
	"Repeat",
	"Underline",
	"Fill",
	"Look",
	"Answer",
	"Work in pairs",
	"Discuss",
	"Practise",
	"Practice",
	"Correct",
	"Put",
	"Find",
	"Order",
	"Watch",
}

//
// Instruction Keywords
//

var InstructionKeywords = []string{
	"Listen",
	"Listen again",
	"Read",
	"Read again",
	"Watch",
	"Repeat",
	"Check",
	"Go to",
	"Work in pairs",
	"Work with a partner",
	"Discuss",
	"Practise",
	"Practice",
}

//
// Regex
//

var (

	// 1A Hello
	// 2B My Family
	// 10C Shopping
	UnitTitleRegex = regexp.MustCompile(
		`^(\d+)([A-Z])\s+(.+)$`,
	)

	// 1A
	// 2B
	// 10C
	UnitCodeRegex = regexp.MustCompile(
		`^\d+[A-Z]$`,
	)

	// James: Hello.
	DialogueRegex = regexp.MustCompile(
		`^([A-Za-z][A-Za-z '\-]{0,40}):\s*(.+)$`,
	)

	// 1
	// 1A
	// 10B
	ExerciseRegex = regexp.MustCompile(
		`^(\d+)\s*([A-Z])?`,
	)

	// page 92
	PageReferenceRegex = regexp.MustCompile(
		`(?i)page\s+\d+`,
	)

	// 1.01
	// 2.13
	// 10.08
	AudioTrackRegex = regexp.MustCompile(
		`\d+\.\d+`,
	)
)

//
// Section Header Lookup
//

var SectionLookup = map[string]BlockKind{
	SectionListening:     BlockListening,
	SectionReading:       BlockReading,
	SectionGrammar:       BlockGrammar,
	SectionVocabulary:    BlockVocabulary,
	SectionPronunciation: BlockPronunciation,
	SectionWriting:       BlockWriting,
}

//
// Media Types
//

const (
	MediaImage = "image"
	MediaAudio = "audio"
	MediaVideo = "video"
)

//
// Exercise Types
//

const (
	ExerciseListening     = "listening"
	ExerciseReading       = "reading"
	ExerciseGrammar       = "grammar"
	ExerciseVocabulary    = "vocabulary"
	ExercisePronunciation = "pronunciation"
	ExerciseWriting       = "writing"
	ExerciseDialogue      = "dialogue"
)

//
// Parser Limits
//

const (
	MaxDialogueSpeakerLength = 40
	MaxTitleLength           = 200
)