type Exercise struct {

    gorm.Model

    SectionID uint

    Number string

    Title string

    Type string

    Order int

    Questions []Question

    Dialogues []Dialogue

    Vocabulary []Vocabulary

    Grammar []Grammar

    Pronunciation []Pronunciation

    Media []Media
}