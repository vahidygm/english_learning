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

func (r *LessonRepository) SaveLesson(lesson models.Lesson) error {
	return r.db.Create(&lesson).Error
}