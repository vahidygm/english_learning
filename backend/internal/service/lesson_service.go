package service

import (
	"math"

	"english-importer/internal/dto"
	"english-importer/internal/mapper"
	"english-importer/internal/repository"
)

type LessonService struct {
	repo   *repository.LessonRepository
	mapper *mapper.LessonMapper
}

func NewLessonService(repo *repository.LessonRepository, mapper *mapper.LessonMapper) *LessonService {
	return &LessonService{repo: repo, mapper: mapper}
}

func (s *LessonService) GetLessons(page, pageSize int) (*dto.PaginatedData, error) {
	lessons, total, err := s.repo.GetAllLessons(page, pageSize)
	if err != nil {
		return nil, err
	}

	items := s.mapper.ToSummaryDTOList(lessons)
	totalPages := int(math.Ceil(float64(total) / float64(pageSize)))

	return &dto.PaginatedData{
		Items:      items,
		Total:      total,
		Page:       page,
		PageSize:   pageSize,
		TotalPages: totalPages,
	}, nil
}

func (s *LessonService) GetLessonByID(id uint) (*dto.LessonDetailDTO, error) {
	lesson, err := s.repo.GetLessonByID(id)
	if err != nil {
		return nil, err
	}

	detail := s.mapper.ToDetailDTO(*lesson)
	return &detail, nil
}
