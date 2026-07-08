package service

import (
	"english-importer/internal/dto"
	"english-importer/internal/mapper"
	"english-importer/internal/repository"
)

type UnitService struct {
	repo   *repository.UnitRepository
	mapper *mapper.UnitMapper
}

func NewUnitService(repo *repository.UnitRepository, mapper *mapper.UnitMapper) *UnitService {
	return &UnitService{repo: repo, mapper: mapper}
}

func (s *UnitService) GetUnitByID(id uint) (*dto.UnitDetailDTO, error) {
	unit, err := s.repo.GetUnitByID(id)
	if err != nil {
		return nil, err
	}

	detail := s.mapper.ToDetailDTO(*unit)
	return &detail, nil
}
