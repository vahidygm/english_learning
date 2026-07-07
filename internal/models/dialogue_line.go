type DialogueLine struct {

    gorm.Model

    DialogueID uint

    Speaker string

    Text string

    Order int
}