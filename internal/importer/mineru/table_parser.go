package mineru

import (
	"strings"

	"golang.org/x/net/html"
)

type TableParser struct{}

func NewTableParser() *TableParser {
	return &TableParser{}
}

// Parse parses a MinerU table block into a ParsedTable.
func (p *TableParser) Parse(block ClassifiedBlock) *ParsedTable {

	if block.Kind != BlockTable {
		return nil
	}

	htmlContent := block.Block.HTML()

	if htmlContent == "" {
		return nil
	}

	rows, err := parseHTMLTable(htmlContent)
	if err != nil {
		return nil
	}

	table := &ParsedTable{
		HTML: htmlContent,
		Rows: rows,
	}

	if len(rows) > 0 {
		table.Title = strings.Join(rows[0], " ")
	}

	return table
}

// ParseMany parses all table blocks.
func (p *TableParser) ParseMany(blocks []ClassifiedBlock) []ParsedTable {

	var tables []ParsedTable

	for _, block := range blocks {

		if block.Kind != BlockTable {
			continue
		}

		table := p.Parse(block)
		if table == nil {
			continue
		}

		tables = append(tables, *table)
	}

	return tables
}

// ----------------------------------------------------------------------
// HTML Parser
// ----------------------------------------------------------------------

func parseHTMLTable(src string) ([][]string, error) {

	doc, err := html.Parse(strings.NewReader(src))
	if err != nil {
		return nil, err
	}

	var rows [][]string

	var walk func(*html.Node)

	walk = func(n *html.Node) {

		if n.Type == html.ElementNode && n.Data == "tr" {

			var row []string

			for cell := n.FirstChild; cell != nil; cell = cell.NextSibling {

				if cell.Type != html.ElementNode {
					continue
				}

				if cell.Data != "td" && cell.Data != "th" {
					continue
				}

				text := extractText(cell)

				row = append(row, strings.TrimSpace(text))
			}

			if len(row) > 0 {
				rows = append(rows, row)
			}
		}

		for child := n.FirstChild; child != nil; child = child.NextSibling {
			walk(child)
		}
	}

	walk(doc)

	return rows, nil
}

func extractText(n *html.Node) string {

	if n == nil {
		return ""
	}

	if n.Type == html.TextNode {
		return n.Data
	}

	var b strings.Builder

	for child := n.FirstChild; child != nil; child = child.NextSibling {
		b.WriteString(extractText(child))
	}

	return b.String()
}

// ----------------------------------------------------------------------
// Helper Methods
// ----------------------------------------------------------------------

// IsVocabularyTable returns true if the table looks like vocabulary data.
func (p *TableParser) IsVocabularyTable(t ParsedTable) bool {

	if len(t.Rows) == 0 {
		return false
	}

	header := strings.ToLower(strings.Join(t.Rows[0], " "))

	return strings.Contains(header, "word") ||
		strings.Contains(header, "country") ||
		strings.Contains(header, "city") ||
		strings.Contains(header, "name")
}

// IsNumberTable returns true for number-learning tables.
func (p *TableParser) IsNumberTable(t ParsedTable) bool {

	if len(t.Rows) == 0 {
		return false
	}

	header := strings.ToLower(strings.Join(t.Rows[0], " "))

	return strings.Contains(header, "number")
}

// Flatten converts the table into plain text.
func (p *TableParser) Flatten(t ParsedTable) string {

	var out []string

	for _, row := range t.Rows {
		out = append(out, strings.Join(row, " | "))
	}

	return strings.Join(out, "\n")
}