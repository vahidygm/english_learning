package mapper

import (
	"english-importer/internal/dto"
	"english-importer/internal/models"
)

type UnitMapper struct {
	exerciseMapper *ExerciseMapper
}

func NewUnitMapper(exerciseMapper *ExerciseMapper) *UnitMapper {
	return &UnitMapper{exerciseMapper: exerciseMapper}
}

func (m *UnitMapper) ToSummaryDTO(u models.Unit) dto.UnitSummaryDTO {
	return dto.UnitSummaryDTO{
		ID:                   u.ID,
		Code:                 u.Code,
		Title:                u.Title,
		GrammarSummary:       u.GrammarSummary,
		VocabularySummary:    u.VocabularySummary,
		PronunciationSummary: u.PronunciationSummary,
		SectionCount:         len(u.Sections),
	}
}

func (m *UnitMapper) ToDetailDTO(u models.Unit) dto.UnitDetailDTO {
	sections := make([]dto.SectionDTO, len(u.Sections))
	for i, s := range u.Sections {
		sections[i] = dto.SectionDTO{
			ID:        s.ID,
			Name:      s.Name,
			Order:     s.Order,
			Exercises: m.exerciseMapper.ToDTOList(s.Exercises),
		}
	}
	return dto.UnitDetailDTO{
		ID:                   u.ID,
		LessonID:             u.LessonID,
		Code:                 u.Code,
		Title:                u.Title,
		GrammarSummary:       u.GrammarSummary,
		VocabularySummary:    u.VocabularySummary,
		PronunciationSummary: u.PronunciationSummary,
		Sections:             sections,
	}
}

func (m *UnitMapper) ToSummaryDTOList(units []models.Unit) []dto.UnitSummaryDTO {
	result := make([]dto.UnitSummaryDTO, len(units))
	for i, u := range units {
		result[i] = m.ToSummaryDTO(u)
	}
	return result
}
