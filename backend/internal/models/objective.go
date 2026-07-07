type Objective struct {

    gorm.Model

    LessonID uint

    UnitCode string

    Skill string

    Grammar string

    Vocabulary string

    Pronunciation string

    Writing string
}