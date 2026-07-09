package dto

type ExerciseDTO struct {
	ID            uint               `json:"id"`
	Number        string             `json:"number"`
	Title         string             `json:"title"`
	Type          string             `json:"type"`
	Instruction   string             `json:"instruction"`
	Order         int                `json:"order"`
	Questions     []QuestionDTO      `json:"questions"`
	Dialogues     []DialogueDTO      `json:"dialogues"`
	Vocabulary    []VocabularyDTO    `json:"vocabulary"`
	Grammar       []GrammarDTO       `json:"grammar"`
	Pronunciation []PronunciationDTO `json:"pronunciation"`
	Tables        []TableDTO         `json:"tables"`
	Media         []MediaDTO         `json:"media"`
}

type QuestionDTO struct {
	ID     uint   `json:"id"`
	Number string `json:"number"`
	Text   string `json:"text"`
	Answer string `json:"answer"`
	Order  int    `json:"order"`
}

type DialogueDTO struct {
	ID    uint              `json:"id"`
	Title string            `json:"title"`
	Lines []DialogueLineDTO `json:"lines"`
}

type DialogueLineDTO struct {
	ID      uint   `json:"id"`
	Speaker string `json:"speaker"`
	Text    string `json:"text"`
	Order   int    `json:"order"`
}

type VocabularyDTO struct {
	ID       uint   `json:"id"`
	Category string `json:"category"`
	Word     string `json:"word"`
	Meaning  string `json:"meaning"`
	Example  string `json:"example"`
	Order    int    `json:"order"`
}

type GrammarDTO struct {
	ID      uint   `json:"id"`
	Topic   string `json:"topic"`
	Rule    string `json:"rule"`
	Example string `json:"example"`
	Order   int    `json:"order"`
}

type PronunciationDTO struct {
	ID      uint   `json:"id"`
	Topic   string `json:"topic"`
	Text    string `json:"text"`
	IPA     string `json:"ipa"`
	AudioID *uint  `json:"audioId"`
	Order   int    `json:"order"`
}

type TableDTO struct {
	ID    uint   `json:"id"`
	Title string `json:"title"`
	HTML  string `json:"html"`
}
