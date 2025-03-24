package domain

import "github.com/google/uuid"

// ユーザーエンティティ
type User struct {
	ID       uuid.UUID
	Email    string
	Username string
	Password string
	Role     string
}
