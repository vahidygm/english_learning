package handlers

import (
	"errors"
	"net/http"
	"strconv"

	"english-importer/internal/dto"
	"english-importer/internal/service"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type LessonHandler struct {
	service *service.LessonService
}

func NewLessonHandler(service *service.LessonService) *LessonHandler {
	return &LessonHandler{service: service}
}

func (h *LessonHandler) GetLessons(c *gin.Context) {
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	pageSize, _ := strconv.Atoi(c.DefaultQuery("pageSize", "20"))

	if page < 1 {
		page = 1
	}
	if pageSize < 1 || pageSize > 100 {
		pageSize = 20
	}

	data, err := h.service.GetLessons(page, pageSize)
	if err != nil {
		c.JSON(http.StatusInternalServerError, dto.Response{
			Success: false,
			Error: &dto.ErrorInfo{
				Code:    "INTERNAL_ERROR",
				Message: "Failed to fetch lessons",
			},
		})
		return
	}

	c.JSON(http.StatusOK, dto.Response{
		Success: true,
		Data:    data,
	})
}

func (h *LessonHandler) GetLessonByID(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, dto.Response{
			Success: false,
			Error: &dto.ErrorInfo{
				Code:    "INVALID_ID",
				Message: "Invalid lesson ID",
			},
		})
		return
	}

	lesson, err := h.service.GetLessonByID(uint(id))
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, dto.Response{
				Success: false,
				Error: &dto.ErrorInfo{
					Code:    "NOT_FOUND",
					Message: "Lesson not found",
				},
			})
			return
		}
		c.JSON(http.StatusInternalServerError, dto.Response{
			Success: false,
			Error: &dto.ErrorInfo{
				Code:    "INTERNAL_ERROR",
				Message: "Failed to fetch lesson",
			},
		})
		return
	}

	c.JSON(http.StatusOK, dto.Response{
		Success: true,
		Data:    lesson,
	})
}
