type Lesson struct {

    gorm.Model

    Number int

    Title string

    CoverImage string

    Objectives []Objective

    Units []Unit
}