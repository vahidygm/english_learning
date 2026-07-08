package dto

type MediaDTO struct {
	ID      uint   `json:"id"`
	Type    string `json:"type"`
	URL     string `json:"url"`
	Caption string `json:"caption"`
	Order   int    `json:"order"`
}
