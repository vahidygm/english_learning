package mineru

import (
	"english-importer/internal/models"
)

type Mapper struct{}

func NewMapper() *Mapper {
	return &Mapper{}
}

//
// Convert full lesson DTO → DB model
//

func (m *Mapper) ToLesson(l ParsedLesson) models.Lesson {

	lesson := models.Lesson{
		Number:  l.Number,
		Title:   l.Title,
	}

	//--------------------------------------------------
	// Objectives
	//--------------------------------------------------

	for _, o := range l.Objectives {

		lesson.Objectives = append(lesson.Objectives, models.Objective{
			UnitCode:      o.UnitCode,
			Skill:         o.Skill,
			Grammar:       o.Grammar,
			Vocabulary:    o.Vocabulary,
			Pronunciation: o.Pronunciation,
			Writing:       o.Writing,
		})
	}

	//--------------------------------------------------
	// Units
	//--------------------------------------------------

	for _, u := range l.Units {
		lesson.Units = append(lesson.Units, m.toUnit(u))
	}

	return lesson
}

//
// Unit mapping
//

func (m *Mapper) toUnit(u ParsedUnit) models.Unit {

	unit := models.Unit{
		Code:  u.Code,
		Title: u.Title,

		GrammarSummary:       u.Metadata.Grammar,
		VocabularySummary:    u.Metadata.Vocabulary,
		PronunciationSummary: u.Metadata.Pronunciation,
	}

	//--------------------------------------------------
	// Sections
	//--------------------------------------------------

	for _, s := range u.Sections {
		unit.Sections = append(unit.Sections, m.toSection(s))
	}

	return unit
}

//
// Section mapping
//

func (m *Mapper) toSection(s ParsedSection) models.Section {

	section := models.Section{
		Name:  s.Name,
		Order: s.Order,
	}

	for _, ex := range s.Exercises {
		section.Exercises = append(section.Exercises, m.toExercise(ex))
	}

	return section
}

//
// Exercise mapping
//

func (m *Mapper) toExercise(e ParsedExercise) models.Exercise {

	ex := models.Exercise{
		Number:      e.Number,
		Title:       e.Title,
		Type:        e.Type,
		Order:       e.Order,
		Instruction: e.Instruction,
	}

	//--------------------------------------------------
	// Questions
	//--------------------------------------------------

	for _, q := range e.Questions {

		ex.Questions = append(ex.Questions, models.Question{
			Number: q.Number,
			Text:   q.Text,
			Answer: q.Answer,
			Order:  q.Order,
		})
	}

	//--------------------------------------------------
	// Dialogues
	//--------------------------------------------------

	for _, d := range e.Dialogues {

		dialogue := models.Dialogue{
			Title: d.Title,
		}

		for _, line := range d.Lines {

			dialogue.Lines = append(dialogue.Lines, models.DialogueLine{
				Speaker: line.Speaker,
				Text:    line.Text,
				Order:   line.Order,
			})
		}

		ex.Dialogues = append(ex.Dialogues, dialogue)
	}

	//--------------------------------------------------
	// Vocabulary
	//--------------------------------------------------

	for _, v := range e.Vocabulary {

		ex.Vocabulary = append(ex.Vocabulary, models.Vocabulary{
			Category: v.Category,
			Word:     v.Word,
			Meaning:  v.Meaning,
			Example:  v.Example,
			Order:    v.Order,
		})
	}

	//--------------------------------------------------
	// Grammar
	//--------------------------------------------------

	for _, g := range e.Grammar {

		ex.Grammar = append(ex.Grammar, models.Grammar{
			Topic:   g.Topic,
			Rule:    g.Rule,
			Example: g.Example,
			Order:   g.Order,
		})
	}

	//--------------------------------------------------
	// Pronunciation
	//--------------------------------------------------

	for _, p := range e.Pronunciation {

		ex.Pronunciation = append(ex.Pronunciation, models.Pronunciation{
			Topic:      p.Topic,
			Text:       p.Text,
			IPA:        p.IPA,
			AudioID:    nil,
			Order:      p.Order,
		})
	}

	//--------------------------------------------------
	// Tables
	//--------------------------------------------------

	for _, t := range e.Tables {

		ex.Tables = append(ex.Tables, models.Table{
			Title: t.Title,
			HTML:  t.HTML,
		})
	}

	//--------------------------------------------------
	// Media
	//--------------------------------------------------

	for _, m := range e.Media {

		ex.Media = append(ex.Media, models.Media{
			Type:    m.Type,
			URL:     m.URL,
			Caption: m.Caption,
			Order:   m.Order,
		})
	}

	return ex
}