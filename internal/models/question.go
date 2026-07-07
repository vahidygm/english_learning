type Question struct {

    gorm.Model

    ExerciseID uint

    Number string

    Text string

    Answer string

    Order int
}