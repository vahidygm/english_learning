package repository

import (
	"english-importer/internal/models"

	"gorm.io/gorm"
)

type MediaRepository struct {
	db *gorm.DB
}

func NewMediaRepository(db *gorm.DB) *MediaRepository {
	return &MediaRepository{db: db}
}

func (r *MediaRepository) GetMediaByID(id uint) (*models.Media, error) {
	var media models.Media
	err := r.db.First(&media, id).Error
	if err != nil {
		return nil, err
	}
	return &media, nil
}
