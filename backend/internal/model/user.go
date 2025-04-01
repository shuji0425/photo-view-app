package model

import "time"

type User struct {
	ID        int64  `gorm:"primaryKey"`
	Email     string `gorm:"unique;not null"`
	Username  string
	Password  string `gorm:"column:password_hash"`
	Role      string
	CreatedAt time.Time
	UpdatedAt time.Time
}
