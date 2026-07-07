type Section struct {

    gorm.Model

    UnitID uint

    Name string

    Order int

    Exercises []Exercise
}