package domain

// DB保存用
type User struct {
	ID       int64
	Email    string
	Username string
	Password string
	Role     string
}
