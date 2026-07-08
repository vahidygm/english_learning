package repository

import (
	"english-importer/internal/models"

	"gorm.io/gorm"
)

type LessonRepository struct {
	db *gorm.DB
}

func NewLessonRepository(db *gorm.DB) *LessonRepository {
	return &LessonRepository{db: db}
}

func (r *LessonRepository) GetAllLessons(page, pageSize int) ([]models.Lesson, int64, error) {
	var lessons []models.Lesson
	var total int64

	if err := r.db.Model(&models.Lesson{}).Count(&total).Error; err != nil {
		return nil, 0, err
	}

	offset := (page - 1) * pageSize
	if err := r.db.Preload("Units").
		Order("number ASC").
		Offset(offset).
		Limit(pageSize).
		Find(&lessons).Error; err != nil {
		return nil, 0, err
	}

	return lessons, total, nil
}

func (r *LessonRepository) GetLessonByID(id uint) (*models.Lesson, error) {
	var lesson models.Lesson
	err := r.db.
		Preload("Objectives").
		Preload("Units").
		Preload("Units.Sections", func(db *gorm.DB) *gorm.DB {
			return db.Order(`"order" ASC`)
		}).
		Preload("Units.Sections.Exercises", func(db *gorm.DB) *gorm.DB {
			return db.Order(`"order" ASC`)
		}).
		Preload("Units.Sections.Exercises.Questions", func(db *gorm.DB) *gorm.DB {
			return db.Order(`"order" ASC`)
		}).
		Preload("Units.Sections.Exercises.Dialogues").
		Preload("Units.Sections.Exercises.Dialogues.Lines", func(db *gorm.DB) *gorm.DB {
			return db.Order(`"order" ASC`)
		}).
		Preload("Units.Sections.Exercises.Vocabulary", func(db *gorm.DB) *gorm.DB {
			return db.Order(`"order" ASC`)
		}).
		Preload("Units.Sections.Exercises.Grammar", func(db *gorm.DB) *gorm.DB {
			return db.Order(`"order" ASC`)
		}).
		Preload("Units.Sections.Exercises.Pronunciation", func(db *gorm.DB) *gorm.DB {
			return db.Order(`"order" ASC`)
		}).
		Preload("Units.Sections.Exercises.Media", func(db *gorm.DB) *gorm.DB {
			return db.Order(`"order" ASC`)
		}).
		First(&lesson, id).Error

	if err != nil {
		return nil, err
	}
	return &lesson, nil
}

func (r *LessonRepository) CountLessons() (int64, error) {
	var count int64
	err := r.db.Model(&models.Lesson{}).Count(&count).Error
	return count, err
}
