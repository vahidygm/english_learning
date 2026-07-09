package main

import (
	"fmt"
	"log"
	"os"

	"english-importer/db"
	"english-importer/internal/models"

	"github.com/joho/godotenv"
)

func main() {
	//--------------------------------------------------
	// Load environment
	//--------------------------------------------------

	if err := godotenv.Load(".env"); err != nil {
		log.Println("No .env found, using system environment variables")
	}

	required := []string{
		"DB_HOST",
		"DB_PORT",
		"DB_USER",
		"DB_PASSWORD",
		"DB_NAME",
		"DB_SSLMODE",
	}

	for _, key := range required {
		if os.Getenv(key) == "" {
			log.Fatalf("%s is not set", key)
		}
	}

	//--------------------------------------------------
	// Connect database
	//--------------------------------------------------

	dsn := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=%s",
		os.Getenv("DB_HOST"),
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_NAME"),
		os.Getenv("DB_PORT"),
		os.Getenv("DB_SSLMODE"),
	)

	database, err := db.New(dsn)
	if err != nil {
		log.Fatalf("database connection failed: %v", err)
	}

	//--------------------------------------------------
	// Auto migrate
	//--------------------------------------------------

	err = database.AutoMigrate(
		&models.Lesson{},
		&models.Objective{},
		&models.Unit{},
		&models.Section{},
		&models.Exercise{},
		&models.Question{},
		&models.Dialogue{},
		&models.DialogueLine{},
		&models.Vocabulary{},
		&models.Grammar{},
		&models.Pronunciation{},
		&models.Table{},
		&models.Media{},
		&models.Audio{},
	)

	if err != nil {
		log.Fatalf("migration failed: %v", err)
	}

	log.Println("Database migration completed successfully.")
}
