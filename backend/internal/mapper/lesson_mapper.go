package mapper

import (
	"english-importer/internal/dto"
	"english-importer/internal/models"
)

type LessonMapper struct {
	unitMapper *UnitMapper
}

func NewLessonMapper(unitMapper *UnitMapper) *LessonMapper {
	return &LessonMapper{unitMapper: unitMapper}
}

func (m *LessonMapper) ToSummaryDTO(l models.Lesson) dto.LessonSummaryDTO {
	return dto.LessonSummaryDTO{
		ID:         l.ID,
		Number:     l.Number,
		Title:      l.Title,
		CoverImage: l.CoverImage,
		UnitCount:  len(l.Units),
	}
}

func (m *LessonMapper) ToDetailDTO(l models.Lesson) dto.LessonDetailDTO {
	objectives := make([]dto.ObjectiveDTO, len(l.Objectives))
	for i, o := range l.Objectives {
		objectives[i] = dto.ObjectiveDTO{
			ID:            o.ID,
			UnitCode:      o.UnitCode,
			Skill:         o.Skill,
			Grammar:       o.Grammar,
			Vocabulary:    o.Vocabulary,
			Pronunciation: o.Pronunciation,
			Writing:       o.Writing,
		}
	}

	return dto.LessonDetailDTO{
		ID:         l.ID,
		Number:     l.Number,
		Title:      l.Title,
		CoverImage: l.CoverImage,
		Objectives: objectives,
		Units:      m.unitMapper.ToSummaryDTOList(l.Units),
	}
}

func (m *LessonMapper) ToSummaryDTOList(lessons []models.Lesson) []dto.LessonSummaryDTO {
	result := make([]dto.LessonSummaryDTO, len(lessons))
	for i, l := range lessons {
		result[i] = m.ToSummaryDTO(l)
	}
	return result
}
