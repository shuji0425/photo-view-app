package domain

import "time"

// PhotoGPS は緯度経度情報（DB用）
type PhotoGPS struct {
	PhotoID   int64
	Latitude  *float64
	Longitude *float64
	IsVisible bool
	CreatedAt time.Time
	UpdatedAt time.Time
}
