package models

import "gorm.io/gorm"

type Lesson struct {
	gorm.Model
	Number     int         `gorm:"column:number"`
	Title      string      `gorm:"column:title"`
	CoverImage string      `gorm:"column:cover_image"`
	Objectives []Objective `gorm:"foreignKey:LessonID"`
	Units      []Unit      `gorm:"foreignKey:LessonID"`
}

type Objective struct {
	gorm.Model
	LessonID      uint   `gorm:"column:lesson_id"`
	UnitCode      string `gorm:"column:unit_code"`
	Skill         string `gorm:"column:skill"`
	Grammar       string `gorm:"column:grammar"`
	Vocabulary    string `gorm:"column:vocabulary"`
	Pronunciation string `gorm:"column:pronunciation"`
	Writing       string `gorm:"column:writing"`
}

type Unit struct {
	gorm.Model
	LessonID             uint      `gorm:"column:lesson_id"`
	Code                 string    `gorm:"column:code"`
	Title                string    `gorm:"column:title"`
	GrammarSummary       string    `gorm:"column:grammar_summary"`
	VocabularySummary    string    `gorm:"column:vocabulary_summary"`
	PronunciationSummary string    `gorm:"column:pronunciation_summary"`
	Sections             []Section `gorm:"foreignKey:UnitID"`
}

type Section struct {
	gorm.Model
	UnitID    uint       `gorm:"column:unit_id"`
	Name      string     `gorm:"column:name"`
	Order     int        `gorm:"column:order"`
	Exercises []Exercise `gorm:"foreignKey:SectionID"`
}

type Exercise struct {
	gorm.Model
	SectionID     uint            `gorm:"column:section_id"`
	Number        string          `gorm:"column:number"`
	Title         string          `gorm:"column:title"`
	Type          string          `gorm:"column:type"`
	Instruction   string          `gorm:"column:instruction"`
	Order         int             `gorm:"column:order"`
	Questions     []Question      `gorm:"foreignKey:ExerciseID"`
	Dialogues     []Dialogue      `gorm:"foreignKey:ExerciseID"`
	Vocabulary    []Vocabulary    `gorm:"foreignKey:ExerciseID"`
	Grammar       []Grammar       `gorm:"foreignKey:ExerciseID"`
	Pronunciation []Pronunciation `gorm:"foreignKey:ExerciseID"`
	Tables        []Table         `gorm:"foreignKey:ExerciseID"`
	Media         []Media         `gorm:"foreignKey:ExerciseID"`
}

type Question struct {
	gorm.Model
	ExerciseID uint   `gorm:"column:exercise_id"`
	Number     string `gorm:"column:number"`
	Text       string `gorm:"column:text"`
	Answer     string `gorm:"column:answer"`
	Order      int    `gorm:"column:order"`
}

type Dialogue struct {
	gorm.Model
	ExerciseID uint           `gorm:"column:exercise_id"`
	Title      string         `gorm:"column:title"`
	Lines      []DialogueLine `gorm:"foreignKey:DialogueID"`
}

type DialogueLine struct {
	gorm.Model
	DialogueID uint   `gorm:"column:dialogue_id"`
	Speaker    string `gorm:"column:speaker"`
	Text       string `gorm:"column:text"`
	Order      int    `gorm:"column:order"`
}

type Vocabulary struct {
	gorm.Model
	ExerciseID uint   `gorm:"column:exercise_id"`
	Category   string `gorm:"column:category"`
	Word       string `gorm:"column:word"`
	Meaning    string `gorm:"column:meaning"`
	Example    string `gorm:"column:example"`
	Order      int    `gorm:"column:order"`
}

type Grammar struct {
	gorm.Model
	ExerciseID uint   `gorm:"column:exercise_id"`
	Topic      string `gorm:"column:topic"`
	Rule       string `gorm:"column:rule"`
	Example    string `gorm:"column:example"`
	Order      int    `gorm:"column:order"`
}

type Pronunciation struct {
	gorm.Model
	ExerciseID uint   `gorm:"column:exercise_id"`
	Topic      string `gorm:"column:topic"`
	Text       string `gorm:"column:text"`
	IPA        string `gorm:"column:ipa"`
	AudioID    *uint  `gorm:"column:audio_id"`
	Order      int    `gorm:"column:order"`
}

type Table struct {
	gorm.Model
	ExerciseID uint   `gorm:"column:exercise_id"`
	Title      string `gorm:"column:title"`
	HTML       string `gorm:"column:html;type:text"`
}

type Media struct {
	gorm.Model
	ExerciseID uint   `gorm:"column:exercise_id"`
	Type       string `gorm:"column:type"`
	URL        string `gorm:"column:url"`
	Caption    string `gorm:"column:caption"`
	Order      int    `gorm:"column:order"`
}

type Audio struct {
	gorm.Model
	ExerciseID uint   `gorm:"column:exercise_id"`
	Track      string `gorm:"column:track"`
	URL        string `gorm:"column:url"`
}
