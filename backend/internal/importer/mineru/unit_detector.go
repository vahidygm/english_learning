package mineru

import (
	"sort"
)

type UnitRange struct {
	Code  string
	Title string

	Start int
	End   int

	Blocks []ClassifiedBlock
}

type UnitDetector struct{}

func NewUnitDetector() *UnitDetector {
	return &UnitDetector{}
}

//
// Detect units in document
//

func (d *UnitDetector) Detect(blocks []ClassifiedBlock) []UnitRange {

	var units []UnitRange

	var current *UnitRange

	for i, b := range blocks {

		//--------------------------------------------------
		// New Unit
		//--------------------------------------------------

		if b.Kind == BlockUnitTitle {

			// close previous unit
			if current != nil {
				current.End = i - 1
				units = append(units, *current)
			}

			current = &UnitRange{
				Code:  b.UnitCode,
				Title: b.UnitTitle,
				Start: i,
			}

			continue
		}

		//--------------------------------------------------
		// Append to current unit
		//--------------------------------------------------

		if current != nil {
			current.Blocks = append(current.Blocks, b)
		}
	}

	//------------------------------------------------------
	// close last unit
	//------------------------------------------------------

	if current != nil {
		current.End = len(blocks) - 1
		units = append(units, *current)
	}

	//------------------------------------------------------
	// sort by unit code (important for safety)
	//------------------------------------------------------

	sort.Slice(units, func(i, j int) bool {
		return units[i].Code < units[j].Code
	})

	return units
}

//
// Helper: extract only unit blocks
//

func (d *UnitDetector) ExtractUnit(blocks []ClassifiedBlock, code string) *UnitRange {

	all := d.Detect(blocks)

	for _, u := range all {
		if u.Code == code {
			return &u
		}
	}

	return nil
}

//
// Helper: validate ordering
//

func (d *UnitDetector) Validate(units []UnitRange) bool {

	seen := map[string]bool{}

	for _, u := range units {

		if seen[u.Code] {
			return false
		}

		seen[u.Code] = true
	}

	return true
}