package mineru

import (
	"strings"
)

type MediaParser struct{}

func NewMediaParser() *MediaParser {
	return &MediaParser{}
}

//
// Parse all media from blocks
//

func (p *MediaParser) Parse(blocks []ClassifiedBlock) []ParsedMedia {

	var media []ParsedMedia

	order := 0

	for _, b := range blocks {

		//--------------------------------------------------
		// IMAGE MEDIA
		//--------------------------------------------------

		if b.Kind == BlockImage || b.Block.HasImage() {

			url := b.Block.Image()

			if url != "" {
				media = append(media, ParsedMedia{
					Type:  MediaImage,
					URL:   url,
					Order: order,
				})

				order++
			}
		}

		//--------------------------------------------------
		// AUDIO MEDIA (1.01, 2.03, etc.)
		//--------------------------------------------------

		if track := ExtractAudioTrack(b.Text); track != "" {

			media = append(media, ParsedMedia{
				Type: MediaAudio,
				URL:  track,
				Order: order,
			})

			order++
		}

		//--------------------------------------------------
		// VIDEO / VLOGS (heuristic from text)
		//--------------------------------------------------

		if looksLikeVideo(b.Text) {

			media = append(media, ParsedMedia{
				Type:  MediaVideo,
				URL:   "",
				Caption: strings.TrimSpace(b.Text),
				Order: order,
			})

			order++
		}
	}

	return UniqueMedia(media)
}

//
// Detect video-like content
//

func looksLikeVideo(text string) bool {

	text = strings.ToLower(text)

	return strings.Contains(text, "vlog") ||
		strings.Contains(text, "bbc") ||
		strings.Contains(text, "video") ||
		strings.Contains(text, "watch")
}

//
// Deduplicate media
//

func UniqueMedia(items []ParsedMedia) []ParsedMedia {

	seen := map[string]bool{}

	var result []ParsedMedia

	for _, m := range items {

		key := m.Type + ":" + m.URL + ":" + m.Caption

		if seen[key] {
			continue
		}

		seen[key] = true

		result = append(result, m)
	}

	return result
}