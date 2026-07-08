package dto

type UnitSummaryDTO struct {
	ID                   uint   `json:"id"`
	Code                 string `json:"code"`
	Title                string `json:"title"`
	GrammarSummary       string `json:"grammarSummary"`
	VocabularySummary    string `json:"vocabularySummary"`
	PronunciationSummary string `json:"pronunciationSummary"`
	SectionCount         int    `json:"sectionCount"`
}

type UnitDetailDTO struct {
	ID                   uint         `json:"id"`
	LessonID             uint         `json:"lessonId"`
	Code                 string       `json:"code"`
	Title                string       `json:"title"`
	GrammarSummary       string       `json:"grammarSummary"`
	VocabularySummary    string       `json:"vocabularySummary"`
	PronunciationSummary string       `json:"pronunciationSummary"`
	Sections             []SectionDTO `json:"sections"`
}

type SectionDTO struct {
	ID        uint          `json:"id"`
	Name      string        `json:"name"`
	Order     int           `json:"order"`
	Exercises []ExerciseDTO `json:"exercises"`
}
