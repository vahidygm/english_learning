package mineru

import (
	"strings"
)

type DialogueParser struct{}

func NewDialogueParser() *DialogueParser {
	return &DialogueParser{}
}

// Parse all dialogues from a list of classified blocks.
func (p *DialogueParser) Parse(blocks []ClassifiedBlock) []ParsedDialogue {

	var dialogues []ParsedDialogue

	var current *ParsedDialogue

	for _, block := range blocks {

		if block.Kind != BlockDialogue {

			if current != nil {
				dialogues = append(dialogues, *current)
				current = nil
			}

			continue
		}

		if current == nil {
			current = &ParsedDialogue{}
		}

		lines := Lines(block.Text)

		for _, line := range lines {

			speaker, text, ok := ParseDialogueLine(line)

			if !ok {

				// Sometimes MinerU splits the sentence into another block.
				if len(current.Lines) > 0 {

					last := &current.Lines[len(current.Lines)-1]

					if text := strings.TrimSpace(line); text != "" {
						last.Text += " " + text
					}
				}

				continue
			}

			current.Lines = append(current.Lines, ParsedDialogueLine{
				Speaker: speaker,
				Text:    text,
				Order:   len(current.Lines),
			})
		}
	}

	if current != nil {
		dialogues = append(dialogues, *current)
	}

	return dialogues
}

// Parse a single dialogue block.
func (p *DialogueParser) ParseBlock(block ClassifiedBlock) *ParsedDialogue {

	if block.Kind != BlockDialogue {
		return nil
	}

	dialogue := &ParsedDialogue{}

	lines := Lines(block.Text)

	for _, line := range lines {

		speaker, text, ok := ParseDialogueLine(line)

		if !ok {
			continue
		}

		dialogue.Lines = append(dialogue.Lines, ParsedDialogueLine{
			Speaker: speaker,
			Text:    text,
			Order:   len(dialogue.Lines),
		})
	}

	if len(dialogue.Lines) == 0 {
		return nil
	}

	return dialogue
}

// LooksLikeDialogue returns true if the supplied blocks contain dialogue.
func (p *DialogueParser) LooksLikeDialogue(blocks []ClassifiedBlock) bool {

	for _, block := range blocks {

		if block.Kind == BlockDialogue {
			return true
		}
	}

	return false
}

// Merge joins two dialogues together.
// Useful when a dialogue spans multiple pages.
func (p *DialogueParser) Merge(a, b ParsedDialogue) ParsedDialogue {

	for _, line := range b.Lines {

		line.Order = len(a.Lines)

		a.Lines = append(a.Lines, line)
	}

	return a
}