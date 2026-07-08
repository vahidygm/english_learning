package handlers

import (
	"net/http"

	"english-importer/internal/dto"

	"github.com/gin-gonic/gin"
)

type HealthHandler struct{}

func NewHealthHandler() *HealthHandler {
	return &HealthHandler{}
}

func (h *HealthHandler) GetHealth(c *gin.Context) {
	c.JSON(http.StatusOK, dto.Response{
		Success: true,
		Data:    gin.H{"status": "ok"},
	})
}
