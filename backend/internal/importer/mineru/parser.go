package mineru

import (
	"fmt"

	"english-importer/internal/models"
	"english-importer/internal/repository"
)

// Parser orchestrates the full import pipeline:
// Load JSON → Parse → Map → Save
type Parser struct {
	repo         *repository.LessonRepository
	lessonParser *LessonParser
	mapper       *Mapper
}

func NewParser(repo *repository.LessonRepository) *Parser {
	return &Parser{
		repo:         repo,
		lessonParser: NewLessonParser(),
		mapper:       NewMapper(),
	}
}

// ParseFile loads a MinerU JSON file, parses it into lessons,
// maps them to DB models, and saves them.
func (p *Parser) ParseFile(path string) error {

	// 1. Load JSON document
	doc, err := Load(path)
	if err != nil {
		return fmt.Errorf("failed to load document: %w", err)
	}

	// 2. Parse into structured DTOs
	parsed := p.lessonParser.Parse(doc)

	// 3. Map to DB models
	lesson := p.mapper.ToLesson(parsed)

	// 4. Save to database
	err = p.repo.CreateLesson(&lesson)
	if err != nil {
		return fmt.Errorf("failed to save lesson: %w", err)
	}

	fmt.Printf("Imported lesson %d: %s (%d units)\n",
		lesson.Number, lesson.Title, len(lesson.Units))

	return nil
}

// ParseFiles imports multiple JSON files.
func (p *Parser) ParseFiles(paths []string) error {
	for _, path := range paths {
		if err := p.ParseFile(path); err != nil {
			return err
		}
	}
	return nil
}

// ParseFileMultiLesson handles a document that may contain multiple lessons.
func (p *Parser) ParseFileMultiLesson(path string) error {

	doc, err := Load(path)
	if err != nil {
		return fmt.Errorf("failed to load document: %w", err)
	}

	parsed := p.lessonParser.Parse(doc)

	lesson := p.mapper.ToLesson(parsed)

	err = p.repo.CreateLesson(&lesson)
	if err != nil {
		return fmt.Errorf("failed to save lesson: %w", err)
	}

	fmt.Printf("Imported lesson %d: %s (%d units)\n",
		lesson.Number, lesson.Title, len(lesson.Units))

	return nil
}

// Ensure Parser uses models (avoid unused import)
var _ = models.Lesson{}
