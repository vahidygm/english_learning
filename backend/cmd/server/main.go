package main

import (
	"fmt"
	"log"
	"os"
	"time"

	"english-importer/db"
	"english-importer/internal/handlers"
	"english-importer/internal/mapper"
	"english-importer/internal/repository"
	"english-importer/internal/service"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
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
		log.Fatal("DB_DSN environment variable is required")
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8083"
	}

	mediaRoot := os.Getenv("MEDIA_ROOT")
	if mediaRoot == "" {
		mediaRoot = "./storage"
	}

	publicMediaURL := os.Getenv("PUBLIC_MEDIA_URL")
	if publicMediaURL == "" {
		publicMediaURL = "http://localhost:8083/media"
	}

	// Connect to database
	database, err := db.New(dsn)
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	// Initialize mappers
	mediaMapper := mapper.NewMediaMapper(publicMediaURL)
	exerciseMapper := mapper.NewExerciseMapper(mediaMapper)
	unitMapper := mapper.NewUnitMapper(exerciseMapper)
	lessonMapper := mapper.NewLessonMapper(unitMapper)

	// Initialize repositories
	lessonRepo := repository.NewLessonRepository(database)
	unitRepo := repository.NewUnitRepository(database)
	mediaRepo := repository.NewMediaRepository(database)

	// Initialize services
	lessonService := service.NewLessonService(lessonRepo, lessonMapper)
	unitService := service.NewUnitService(unitRepo, unitMapper)
	mediaService := service.NewMediaService(mediaRepo, mediaMapper)

	// Initialize handlers
	healthHandler := handlers.NewHealthHandler()
	lessonHandler := handlers.NewLessonHandler(lessonService)
	unitHandler := handlers.NewUnitHandler(unitService)
	mediaHandler := handlers.NewMediaHandler(mediaService)

	// Setup Gin
	r := gin.Default()

	// CORS
	r.Use(cors.New(cors.Config{
		AllowAllOrigins:  true,
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		MaxAge:           12 * time.Hour,
	}))

	// Serve static media files
	r.Static("/media", mediaRoot)

	// API routes
	v1 := r.Group("/api/v1")
	{
		v1.GET("/health", healthHandler.GetHealth)
		v1.GET("/lessons", lessonHandler.GetLessons)
		v1.GET("/lessons/:id", lessonHandler.GetLessonByID)
		v1.GET("/units/:id", unitHandler.GetUnitByID)
		v1.GET("/media/:id", mediaHandler.GetMediaByID)
	}

	log.Printf("Server starting on port %s", port)
	if err := r.Run(fmt.Sprintf(":%s", port)); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
