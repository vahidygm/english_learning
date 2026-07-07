package mineru

import (
	"regexp"
	"strings"
)

//
// String Helpers
//

func Normalize(text string) string {

	text = strings.ReplaceAll(text, "\r", "")
	text = strings.ReplaceAll(text, "\t", " ")

	lines := strings.Split(text, "\n")

	var out []string

	for _, line := range lines {

		line = strings.TrimSpace(line)

		if line == "" {
			continue
		}

		for strings.Contains(line, "  ") {
			line = strings.ReplaceAll(line, "  ", " ")
		}

		out = append(out, line)
	}

	return strings.Join(out, "\n")
}

func NormalizeInline(text string) string {

	text = Normalize(text)

	return strings.ReplaceAll(text, "\n", " ")
}

func Lines(text string) []string {

	text = Normalize(text)

	if text == "" {
		return nil
	}

	return strings.Split(text, "\n")
}

func IsEmpty(text string) bool {
	return strings.TrimSpace(text) == ""
}

func ContainsAny(text string, keywords []string) bool {

	for _, keyword := range keywords {

		if strings.Contains(text, keyword) {
			return true
		}
	}

	return false
}

func StartsWithAny(text string, prefixes []string) bool {

	for _, prefix := range prefixes {

		if strings.HasPrefix(text, prefix) {
			return true
		}
	}

	return false
}

//
// Unit Helpers
//

func ParseUnitTitle(text string) (code, title string, ok bool) {

	text = NormalizeInline(text)

	match := UnitTitleRegex.FindStringSubmatch(text)

	if len(match) != 4 {
		return "", "", false
	}

	code = match[1] + match[2]
	title = strings.TrimSpace(match[3])

	return code, title, true
}

//
// Dialogue
//

func ParseDialogueLine(text string) (speaker, sentence string, ok bool) {

	text = NormalizeInline(text)

	match := DialogueRegex.FindStringSubmatch(text)

	if len(match) != 3 {
		return "", "", false
	}

	speaker = strings.TrimSpace(match[1])

	sentence = strings.TrimSpace(match[2])

	return speaker, sentence, true
}

//
// Exercise
//

func ParseExerciseNumber(text string) string {

	text = NormalizeInline(text)

	match := ExerciseRegex.FindString(text)

	return strings.TrimSpace(match)
}

//
// Audio
//

func ExtractAudioTrack(text string) string {

	text = NormalizeInline(text)

	return AudioTrackRegex.FindString(text)
}

//
// References
//

func IsPageReference(text string) bool {

	text = NormalizeInline(text)

	return PageReferenceRegex.MatchString(text)
}

//
// Metadata
//

func SplitMetadata(text string) map[string]string {

	result := map[string]string{}

	lines := Lines(text)

	for _, line := range lines {

		switch {

		case strings.HasPrefix(line, "GRAMMAR"):

			result["grammar"] = afterPipe(line)

		case strings.HasPrefix(line, "VOCABULARY"):

			result["vocabulary"] = afterPipe(line)

		case strings.HasPrefix(line, "PRONUNCIATION"):

			result["pronunciation"] = afterPipe(line)

		case strings.HasPrefix(line, "WRITING"):

			result["writing"] = afterPipe(line)
		}
	}

	return result
}

func afterPipe(text string) string {

	idx := strings.Index(text, "|")

	if idx == -1 {
		return ""
	}

	return strings.TrimSpace(text[idx+1:])
}

//
// Regex Helpers
//

func MatchRegex(text string, re *regexp.Regexp) bool {
	return re.MatchString(text)
}

func FirstRegex(text string, re *regexp.Regexp) string {
	return re.FindString(text)
}

//
// Generic
//

func UniqueStrings(items []string) []string {

	seen := map[string]struct{}{}

	var result []string

	for _, item := range items {

		item = strings.TrimSpace(item)

		if item == "" {
			continue
		}

		if _, ok := seen[item]; ok {
			continue
		}

		seen[item] = struct{}{}

		result = append(result, item)
	}

	return result
}

func CleanLines(lines []string) []string {

	var result []string

	for _, line := range lines {

		line = NormalizeInline(line)

		if line == "" {
			continue
		}

		result = append(result, line)
	}

	return result
}