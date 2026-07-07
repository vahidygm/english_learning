type Pronunciation struct {

    gorm.Model

    ExerciseID uint

    Topic string

    Text string

    IPA string

    AudioID *uint

    Order int
}