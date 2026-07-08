package mapper

import (
	"strings"

	"english-importer/internal/dto"
	"english-importer/internal/models"
)

type MediaMapper struct {
	publicMediaURL string
}

func NewMediaMapper(publicMediaURL string) *MediaMapper {
	return &MediaMapper{publicMediaURL: publicMediaURL}
}

func (m *MediaMapper) ToDTO(media models.Media) dto.MediaDTO {
	url := media.URL
	if url != "" && !strings.HasPrefix(url, "http://") && !strings.HasPrefix(url, "https://") {
		url = strings.TrimRight(m.publicMediaURL, "/") + "/" + strings.TrimLeft(url, "/")
	}
	return dto.MediaDTO{
		ID:      media.ID,
		Type:    media.Type,
		URL:     url,
		Caption: media.Caption,
		Order:   media.Order,
	}
}
