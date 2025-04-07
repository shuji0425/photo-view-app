package domain

import "time"

// DB保存用
type User struct {
	ID        int64
	Email     string
	Username  string
	Password  string
	Role      string
	CreatedAt time.Time
	UpdatedAt time.Time
}

// パスワード更新用
type PasswordUpdate struct {
	CurrentPassword    string
	NewPassword        string
	ConfirmNewPassword string
}
