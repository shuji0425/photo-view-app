package model

import "time"

type PhotoGPS struct {
	PhotoID   int64 `gorm:"primaryKey"`
	Latitude  *float64
	Longitude *float64
	IsVisible bool
	CreatedAt time.Time
	UpdatedAt time.Time
}
