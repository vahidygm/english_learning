package dto

type LessonSummaryDTO struct {
	ID         uint   `json:"id"`
	Number     int    `json:"number"`
	Title      string `json:"title"`
	CoverImage string `json:"coverImage"`
	UnitCount  int    `json:"unitCount"`
}

type LessonDetailDTO struct {
	ID         uint             `json:"id"`
	Number     int              `json:"number"`
	Title      string           `json:"title"`
	CoverImage string           `json:"coverImage"`
	Objectives []ObjectiveDTO   `json:"objectives"`
	Units      []UnitSummaryDTO `json:"units"`
}

type ObjectiveDTO struct {
	ID            uint   `json:"id"`
	UnitCode      string `json:"unitCode"`
	Skill         string `json:"skill"`
	Grammar       string `json:"grammar"`
	Vocabulary    string `json:"vocabulary"`
	Pronunciation string `json:"pronunciation"`
	Writing       string `json:"writing"`
}
