package model

import "time"

type Photo struct {
	ID          int64  `gorm:"primaryKey"`
	ImageURL    string `gorm:"unique;not null"`
	AspectRatio float64
	Title       *string
	Description *string
	CategoryID  *int64
	UserID      *int64
	IsVisible   bool `gorm:"default:false"`
	TakenAt     *time.Time
	CreatedAt   *time.Time `gorm:"autoCreateTime"`
	UpdatedAt   *time.Time `gorm:"autoUpdateTime"`
}
