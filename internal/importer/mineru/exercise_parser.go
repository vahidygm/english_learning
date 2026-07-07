package mineru

import (
	"strings"
)

type ExerciseParser struct {
	questionParser    *QuestionParser
	dialogueParser    *DialogueParser
	vocabularyParser  *VocabularyParser
	tableParser       *TableParser
	mediaParser       *MediaParser
}

func NewExerciseParser() *ExerciseParser {

	return &ExerciseParser{
		questionParser:   NewQuestionParser(),
		dialogueParser:   NewDialogueParser(),
		vocabularyParser: NewVocabularyParser(),
		tableParser:      NewTableParser(),
		mediaParser:      NewMediaParser(),
	}
}

// Parse receives all blocks belonging to ONE section
// (LISTENING, GRAMMAR, READING...)
func (p *ExerciseParser) Parse(blocks []ClassifiedBlock) []ParsedExercise {

	var exercises []ParsedExercise

	var current []ClassifiedBlock

	for _, block := range blocks {

		if p.isExerciseStart(block) {

			if len(current) > 0 {

				exercises = append(exercises,
					p.buildExercise(current),
				)

				current = nil
			}
		}

		current = append(current, block)
	}

	if len(current) > 0 {

		exercises = append(exercises,
			p.buildExercise(current),
		)
	}

	for i := range exercises {
		exercises[i].Order = i
	}

	return exercises
}

func (p *ExerciseParser) buildExercise(blocks []ClassifiedBlock) ParsedExercise {

	var ex ParsedExercise

	if len(blocks) == 0 {
		return ex
	}

	first := blocks[0]

	ex.Number = first.ExerciseNumber

	ex.Type = p.detectExerciseType(blocks)

	ex.Instruction = p.extractInstruction(blocks)

	//----------------------------------------------------
	// Audio
	//----------------------------------------------------

	audioSet := map[string]struct{}{}

	for _, block := range blocks {

		if block.AudioTrack == "" {
			continue
		}

		audioSet[block.AudioTrack] = struct{}{}
	}

	for track := range audioSet {
		ex.AudioTracks = append(ex.AudioTracks, track)
	}

	//----------------------------------------------------
	// Tables
	//----------------------------------------------------

	ex.Tables = p.tableParser.ParseMany(blocks)

	//----------------------------------------------------
	// Vocabulary
	//----------------------------------------------------

	ex.Vocabulary = p.vocabularyParser.Parse(
		blocks,
		ex.Tables,
	)

	//----------------------------------------------------
	// Dialogues
	//----------------------------------------------------

	ex.Dialogues = p.dialogueParser.Parse(blocks)

	//----------------------------------------------------
	// Questions
	//----------------------------------------------------

	ex.Questions = p.questionParser.Parse(blocks)

	//----------------------------------------------------
	// Media
	//----------------------------------------------------

	ex.Media = p.mediaParser.Parse(blocks)

	//----------------------------------------------------
	// Notes
	//----------------------------------------------------

	ex.Notes = p.extractNotes(blocks)

	return ex
}

func (p *ExerciseParser) isExerciseStart(block ClassifiedBlock) bool {

	if block.Kind != BlockExercise {
		return false
	}

	return block.ExerciseNumber != ""
}

func (p *ExerciseParser) detectExerciseType(blocks []ClassifiedBlock) string {

	for _, block := range blocks {

		switch block.Kind {

		case BlockListening:
			return ExerciseListening

		case BlockReading:
			return ExerciseReading

		case BlockGrammar:
			return ExerciseGrammar

		case BlockVocabulary:
			return ExerciseVocabulary

		case BlockPronunciation:
			return ExercisePronunciation

		case BlockDialogue:
			return ExerciseDialogue
		}
	}

	return "general"
}

func (p *ExerciseParser) extractInstruction(blocks []ClassifiedBlock) string {

	for _, block := range blocks {

		if block.Kind == BlockInstruction {

			return NormalizeInline(block.Text)
		}
	}

	for _, block := range blocks {

		if block.Kind == BlockExercise {

			return NormalizeInline(block.Text)
		}
	}

	return ""
}

func (p *ExerciseParser) extractNotes(blocks []ClassifiedBlock) []string {

	var notes []string

	for _, block := range blocks {

		if block.Kind != BlockReference {
			continue
		}

		notes = append(notes,
			strings.TrimSpace(block.Text))
	}

	return notes
}