package domain

// DB保存用
type User struct {
	ID       int64  `gorm:"primaryKey"`
	Email    string `gorm:"unique"`
	Username string
	Password string `gorm:"column:password_hash"`
	Role     string
}
