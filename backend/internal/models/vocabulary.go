type Vocabulary struct {

    gorm.Model

    ExerciseID uint

    Category string

    Word string

    Meaning string

    Example string

    Order int
}