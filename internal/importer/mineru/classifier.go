package mineru

import (
	"strings"
)

type ClassifiedBlock struct {
	Kind BlockKind

	Block Block

	Text string

	Page int

	UnitCode string

	UnitTitle string

	ExerciseNumber string

	AudioTrack string
}

func Classify(block Block) BlockKind {
	return ClassifyBlock(block).Kind
}

func ClassifyBlock(block Block) ClassifiedBlock {

	text := Normalize(block.Text())

	result := ClassifiedBlock{
		Block: block,
		Text:  text,
	}

	//--------------------------------------------------------
	// Image
	//--------------------------------------------------------

	if block.IsImage() {
		result.Kind = BlockImage
		return result
	}

	//--------------------------------------------------------
	// Table
	//--------------------------------------------------------

	if block.IsTable() {
		result.Kind = BlockTable
		return result
	}

	//--------------------------------------------------------
	// Empty
	//--------------------------------------------------------

	if text == "" {
		result.Kind = BlockUnknown
		return result
	}

	//--------------------------------------------------------
	// Lesson Objectives
	//--------------------------------------------------------

	if strings.Contains(strings.ToUpper(text), "LEARNING OBJECTIVES") {
		result.Kind = BlockLessonObjectives
		return result
	}

	//--------------------------------------------------------
	// Unit Title
	//--------------------------------------------------------

	if code, title, ok := ParseUnitTitle(text); ok {

		result.Kind = BlockUnitTitle
		result.UnitCode = code
		result.UnitTitle = title

		return result
	}

	//--------------------------------------------------------
	// Metadata
	//--------------------------------------------------------

	if isMetadata(text) {

		result.Kind = BlockMetadata

		return result
	}

	//--------------------------------------------------------
	// Section Header
	//--------------------------------------------------------

	if kind, ok := detectSection(text); ok {

		result.Kind = kind

		return result
	}

	//--------------------------------------------------------
	// Dialogue
	//--------------------------------------------------------

	if looksLikeDialogue(text) {

		result.Kind = BlockDialogue

		return result
	}

	//--------------------------------------------------------
	// Exercise
	//--------------------------------------------------------

	if looksLikeExercise(text) {

		result.Kind = BlockExercise
		result.ExerciseNumber = ParseExerciseNumber(text)
		result.AudioTrack = ExtractAudioTrack(text)

		return result
	}

	//--------------------------------------------------------
	// Reference
	//--------------------------------------------------------

	if IsPageReference(text) {

		result.Kind = BlockReference

		return result
	}

	//--------------------------------------------------------
	// Instruction
	//--------------------------------------------------------

	if looksLikeInstruction(text) {

		result.Kind = BlockInstruction
		result.AudioTrack = ExtractAudioTrack(text)

		return result
	}

	//--------------------------------------------------------

	result.Kind = BlockUnknown

	return result
}

func detectSection(text string) (BlockKind, bool) {

	text = strings.ToUpper(NormalizeInline(text))

	kind, ok := SectionLookup[text]

	return kind, ok
}

func isMetadata(text string) bool {

	text = strings.ToUpper(text)

	return strings.Contains(text, KeywordGrammar) &&
		strings.Contains(text, KeywordVocabulary) &&
		strings.Contains(text, KeywordPronunciation)
}

func looksLikeDialogue(text string) bool {

	lines := Lines(text)

	count := 0

	for _, line := range lines {

		_, _, ok := ParseDialogueLine(line)

		if ok {
			count++
		}
	}

	return count > 0
}

func looksLikeExercise(text string) bool {

	if ExerciseRegex.MatchString(text) {
		return true
	}

	return ContainsAny(text, ExerciseKeywords)
}

func looksLikeInstruction(text string) bool {

	return ContainsAny(text, InstructionKeywords)
}