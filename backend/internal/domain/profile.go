package domain

import "time"

// プロフィール
type Profile struct {
	UserID    int64 `gorm:"primaryKey"`
	Avatar    string
	Bio       string
	Website   string
	Location  string
	CreatedAt time.Time
	UpdatedAt time.Time
}
