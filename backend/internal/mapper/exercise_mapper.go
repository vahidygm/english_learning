package mapper

import (
	"english-importer/internal/dto"
	"english-importer/internal/models"
)

type ExerciseMapper struct {
	mediaMapper *MediaMapper
}

func NewExerciseMapper(mediaMapper *MediaMapper) *ExerciseMapper {
	return &ExerciseMapper{mediaMapper: mediaMapper}
}

func (m *ExerciseMapper) ToDTO(e models.Exercise) dto.ExerciseDTO {
	questions := make([]dto.QuestionDTO, len(e.Questions))
	for i, q := range e.Questions {
		questions[i] = m.questionToDTO(q)
	}

	dialogues := make([]dto.DialogueDTO, len(e.Dialogues))
	for i, d := range e.Dialogues {
		dialogues[i] = m.dialogueToDTO(d)
	}

	vocabulary := make([]dto.VocabularyDTO, len(e.Vocabulary))
	for i, v := range e.Vocabulary {
		vocabulary[i] = m.vocabularyToDTO(v)
	}

	grammar := make([]dto.GrammarDTO, len(e.Grammar))
	for i, g := range e.Grammar {
		grammar[i] = m.grammarToDTO(g)
	}

	pronunciation := make([]dto.PronunciationDTO, len(e.Pronunciation))
	for i, p := range e.Pronunciation {
		pronunciation[i] = m.pronunciationToDTO(p)
	}

	tables := make([]dto.TableDTO, len(e.Tables))
	for i, t := range e.Tables {
		tables[i] = m.tableToDTO(t)
	}

	media := make([]dto.MediaDTO, len(e.Media))
	for i, md := range e.Media {
		media[i] = m.mediaMapper.ToDTO(md)
	}

	return dto.ExerciseDTO{
		ID:            e.ID,
		Number:        e.Number,
		Title:         e.Title,
		Type:          e.Type,
		Instruction:   e.Instruction,
		Order:         e.Order,
		Questions:     questions,
		Dialogues:     dialogues,
		Vocabulary:    vocabulary,
		Grammar:       grammar,
		Pronunciation: pronunciation,
		Tables:        tables,
		Media:         media,
	}
}

func (m *ExerciseMapper) ToDTOList(exercises []models.Exercise) []dto.ExerciseDTO {
	result := make([]dto.ExerciseDTO, len(exercises))
	for i, e := range exercises {
		result[i] = m.ToDTO(e)
	}
	return result
}

func (m *ExerciseMapper) questionToDTO(q models.Question) dto.QuestionDTO {
	return dto.QuestionDTO{
		ID:     q.ID,
		Number: q.Number,
		Text:   q.Text,
		Answer: q.Answer,
		Order:  q.Order,
	}
}

func (m *ExerciseMapper) dialogueToDTO(d models.Dialogue) dto.DialogueDTO {
	lines := make([]dto.DialogueLineDTO, len(d.Lines))
	for i, l := range d.Lines {
		lines[i] = dto.DialogueLineDTO{
			ID:      l.ID,
			Speaker: l.Speaker,
			Text:    l.Text,
			Order:   l.Order,
		}
	}
	return dto.DialogueDTO{
		ID:    d.ID,
		Title: d.Title,
		Lines: lines,
	}
}

func (m *ExerciseMapper) vocabularyToDTO(v models.Vocabulary) dto.VocabularyDTO {
	return dto.VocabularyDTO{
		ID:       v.ID,
		Category: v.Category,
		Word:     v.Word,
		Meaning:  v.Meaning,
		Example:  v.Example,
		Order:    v.Order,
	}
}

func (m *ExerciseMapper) grammarToDTO(g models.Grammar) dto.GrammarDTO {
	return dto.GrammarDTO{
		ID:      g.ID,
		Topic:   g.Topic,
		Rule:    g.Rule,
		Example: g.Example,
		Order:   g.Order,
	}
}

func (m *ExerciseMapper) pronunciationToDTO(p models.Pronunciation) dto.PronunciationDTO {
	return dto.PronunciationDTO{
		ID:      p.ID,
		Topic:   p.Topic,
		Text:    p.Text,
		IPA:     p.IPA,
		AudioID: p.AudioID,
		Order:   p.Order,
	}
}

func (m *ExerciseMapper) tableToDTO(t models.Table) dto.TableDTO {
	return dto.TableDTO{
		ID:    t.ID,
		Title: t.Title,
		HTML:  t.HTML,
	}
}
