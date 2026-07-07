type Unit struct {

    gorm.Model

    LessonID uint

    Code string

    Title string

    GrammarSummary string

    VocabularySummary string

    PronunciationSummary string

    Sections []Section
}