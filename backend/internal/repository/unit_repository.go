package repository

import (
	"english-importer/internal/models"

	"gorm.io/gorm"
)

type UnitRepository struct {
	db *gorm.DB
}

func NewUnitRepository(db *gorm.DB) *UnitRepository {
	return &UnitRepository{db: db}
}

func (r *UnitRepository) GetUnitByID(id uint) (*models.Unit, error) {
	var unit models.Unit
	err := r.db.
		Preload("Sections", func(db *gorm.DB) *gorm.DB {
			return db.Order(`"order" ASC`)
		}).
		Preload("Sections.Exercises", func(db *gorm.DB) *gorm.DB {
			return db.Order(`"order" ASC`)
		}).
		Preload("Sections.Exercises.Questions", func(db *gorm.DB) *gorm.DB {
			return db.Order(`"order" ASC`)
		}).
		Preload("Sections.Exercises.Dialogues").
		Preload("Sections.Exercises.Dialogues.Lines", func(db *gorm.DB) *gorm.DB {
			return db.Order(`"order" ASC`)
		}).
		Preload("Sections.Exercises.Vocabulary", func(db *gorm.DB) *gorm.DB {
			return db.Order(`"order" ASC`)
		}).
		Preload("Sections.Exercises.Grammar", func(db *gorm.DB) *gorm.DB {
			return db.Order(`"order" ASC`)
		}).
		Preload("Sections.Exercises.Pronunciation", func(db *gorm.DB) *gorm.DB {
			return db.Order(`"order" ASC`)
		}).
		Preload("Sections.Exercises.Media", func(db *gorm.DB) *gorm.DB {
			return db.Order(`"order" ASC`)
		}).
		First(&unit, id).Error

	if err != nil {
		return nil, err
	}
	return &unit, nil
}
