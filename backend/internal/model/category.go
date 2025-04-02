package model

import "time"

type Category struct {
	ID        int64      `gorm:"primaryKey"`
	Name      string     `gorm:"unique;not null"`
	SortOrder int        `gorm:"not null;default:0"`
	CreatedAt *time.Time `gorm:"autoCreateTime"`
	UpdatedAt *time.Time `gorm:"autoUpdateTime"`
}
