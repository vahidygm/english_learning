type Grammar struct {

    gorm.Model

    ExerciseID uint

    Topic string

    Rule string

    Example string

    Order int
}