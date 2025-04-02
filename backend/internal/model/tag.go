package model

import "time"

type Tag struct {
	ID         int64  `gorm:"primaryKey"`
	Name       string `gorm:"unique;not null"`
	CategoryID *int64
	SortOrder  int        `gorm:"not null;default:0"`
	CreatedAt  *time.Time `gorm:"autoCreateTime"`
	UpdatedAt  *time.Time `gorm:"autoUpdateTime"`
}
