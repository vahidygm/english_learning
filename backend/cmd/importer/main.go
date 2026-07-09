package main

import (
	"fmt"
	"log"
	"os"

	"english-importer/db"
	"english-importer/internal/importer/mineru"
	"english-importer/internal/repository"

	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
    if err != nil {
        log.Println("No .env file found, using system environment variables")
    }

	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable",
		os.Getenv("DB_HOST"),
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_NAME"),
		os.Getenv("DB_PORT"),
	)
	if dsn == "" {
		log.Fatal("DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT environment variables are required")
	}

	database, err := db.New(dsn)
	if err != nil {
		log.Fatal(err)
	}

	repo := repository.NewLessonRepository(database)

	parser := mineru.NewParser(repo)

	path := os.Getenv("FILE_PATH")
	if path == "" {
		log.Fatal("FILE_PATH is required")
	}

	err = parser.ParseFile(path)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Import completed successfully")
}