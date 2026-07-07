package mineru

import (
	"regexp"
	"strings"
)

type QuestionParser struct{}

func NewQuestionParser() *QuestionParser {
	return &QuestionParser{}
}

var questionNumberRegex = regexp.MustCompile(`^(\d+)[\.\)]?\s*(.+)$`)

//
// Parse questions from exercise blocks
//

func (p *QuestionParser) Parse(blocks []ClassifiedBlock) []ParsedQuestion {

	var questions []ParsedQuestion

	order := 0

	buffer := ""

	for _, b := range blocks {

		if b.Kind != BlockExercise && b.Kind != BlockInstruction {
			continue
		}

		lines := Lines(b.Text)

		for _, line := range lines {

			line = NormalizeInline(line)

			if line == "" {
				continue
			}

			//--------------------------------------------------
			// Case 1: numbered question (1, 2, 3...)
			//--------------------------------------------------

			if matches := questionNumberRegex.FindStringSubmatch(line); len(matches) == 3 {

				// flush previous buffer if exists
				if buffer != "" {

					questions = append(questions, ParsedQuestion{
						Text:  strings.TrimSpace(buffer),
						Order: order,
					})

					order++
					buffer = ""
				}

				questions = append(questions, ParsedQuestion{
					Number: matches[1],
					Text:   strings.TrimSpace(matches[2]),
					Order:  order,
				})

				order++
				continue
			}

			//--------------------------------------------------
			// Case 2: continuation of previous line
			//--------------------------------------------------

			if buffer != "" {
				buffer += " " + line
			} else {
				buffer = line
			}
		}
	}

	//--------------------------------------------------
	// flush remaining buffer
	//--------------------------------------------------

	if buffer != "" {

		questions = append(questions, ParsedQuestion{
			Text:  strings.TrimSpace(buffer),
			Order: order,
		})
	}

	return questions
}

//
// Detect if block contains questions
//

func (p *QuestionParser) LooksLikeQuestion(block ClassifiedBlock) bool {

	text := strings.ToLower(block.Text)

	return strings.Contains(text, "complete") ||
		strings.Contains(text, "match") ||
		strings.Contains(text, "choose") ||
		strings.Contains(text, "answer") ||
		strings.Contains(text, "write") ||
		strings.Contains(text, "fill") ||
		strings.Contains(text, "listen") ||
		strings.Contains(text, "read")
}