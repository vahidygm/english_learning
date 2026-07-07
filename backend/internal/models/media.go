type Media struct {

    gorm.Model

    ExerciseID uint

    Type string

    URL string

    Caption string

    Order int
}