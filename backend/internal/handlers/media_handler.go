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

type MediaHandler struct {
	service *service.MediaService
}

func NewMediaHandler(service *service.MediaService) *MediaHandler {
	return &MediaHandler{service: service}
}

func (h *MediaHandler) GetMediaByID(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, dto.Response{
			Success: false,
			Error: &dto.ErrorInfo{
				Code:    "INVALID_ID",
				Message: "Invalid media ID",
			},
		})
		return
	}

	media, err := h.service.GetMediaByID(uint(id))
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, dto.Response{
				Success: false,
				Error: &dto.ErrorInfo{
					Code:    "NOT_FOUND",
					Message: "Media not found",
				},
			})
			return
		}
		c.JSON(http.StatusInternalServerError, dto.Response{
			Success: false,
			Error: &dto.ErrorInfo{
				Code:    "INTERNAL_ERROR",
				Message: "Failed to fetch media",
			},
		})
		return
	}

	c.JSON(http.StatusOK, dto.Response{
		Success: true,
		Data:    media,
	})
}
