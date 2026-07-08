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

type UnitHandler struct {
	service *service.UnitService
}

func NewUnitHandler(service *service.UnitService) *UnitHandler {
	return &UnitHandler{service: service}
}

func (h *UnitHandler) GetUnitByID(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, dto.Response{
			Success: false,
			Error: &dto.ErrorInfo{
				Code:    "INVALID_ID",
				Message: "Invalid unit ID",
			},
		})
		return
	}

	unit, err := h.service.GetUnitByID(uint(id))
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, dto.Response{
				Success: false,
				Error: &dto.ErrorInfo{
					Code:    "NOT_FOUND",
					Message: "Unit not found",
				},
			})
			return
		}
		c.JSON(http.StatusInternalServerError, dto.Response{
			Success: false,
			Error: &dto.ErrorInfo{
				Code:    "INTERNAL_ERROR",
				Message: "Failed to fetch unit",
			},
		})
		return
	}

	c.JSON(http.StatusOK, dto.Response{
		Success: true,
		Data:    unit,
	})
}
