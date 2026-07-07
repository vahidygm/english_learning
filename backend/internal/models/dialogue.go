type Dialogue struct {

    gorm.Model

    ExerciseID uint

    Title string

    Lines []DialogueLine
}