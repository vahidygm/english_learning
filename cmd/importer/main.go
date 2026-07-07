package main

import (
	"fmt"
	"log"
	"os"

	"english-importer/internal/db"
	"english-importer/internal/importer/mineru"
	"english-importer/internal/repository"
)

func main() {

	dsn := os.Getenv("DB_DSN")
	if dsn == "" {
		dsn = "host=postgres user=postgres password=postgres dbname=english port=5432 sslmode=disable"
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