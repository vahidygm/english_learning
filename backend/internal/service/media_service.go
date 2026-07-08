package service

import (
	"english-importer/internal/dto"
	"english-importer/internal/mapper"
	"english-importer/internal/repository"
)

type MediaService struct {
	repo   *repository.MediaRepository
	mapper *mapper.MediaMapper
}

func NewMediaService(repo *repository.MediaRepository, mapper *mapper.MediaMapper) *MediaService {
	return &MediaService{repo: repo, mapper: mapper}
}

func (s *MediaService) GetMediaByID(id uint) (*dto.MediaDTO, error) {
	media, err := s.repo.GetMediaByID(id)
	if err != nil {
		return nil, err
	}

	result := s.mapper.ToDTO(*media)
	return &result, nil
}
