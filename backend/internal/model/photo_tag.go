package model

import "time"

type PhotoTag struct {
	PhotoID   int64 `gorm:"primaryKey"`
	TagID     int64 `gorm:"primaryKey"`
	SortOrder int   `gorm:"not null;default:0"`
	CreatedAt time.Time
	UpdatedAt time.Time
}
