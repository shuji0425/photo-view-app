package dto

import "time"

// レスポンス用
type UserResponse struct {
	ID        int64     `json:"id"`
	Email     string    `json:"email"`
	Username  string    `json:"username"`
	Role      string    `json:"role"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

// ユーザー情報更新
type UpdateAccountRequest struct {
	Username        string `json:"username"`
	Email           string `json:"email"`
	CurrentPassword string `json:"current_password"`
}

// パスワード更新
type UpdatePasswordRequest struct {
	CurrentPassword    string `json:"current_password"`
	NewPassword        string `json:"new_password"`
	ConfirmNewPassword string `json:"confirm_new_password"`
}
