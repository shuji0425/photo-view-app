package domain

import "time"

// Photo は画像投稿のメイン情報（DB用）
type Photo struct {
	ID          int64
	ImageURL    string
	AspectRatio float64
	Title       *string
	Description *string
	CategoryID  *int64
	UserID      *int64
	IsVisible   bool
	TakenAt     *time.Time
	CreatedAt   time.Time
	UpdatedAt   time.Time
}

// PhotoEXIF はメタデータ（DB用）
type PhotoEXIF struct {
	PhotoID      int64
	CameraMake   *string
	CameraModel  *string
	LensModel    *string
	ISO          *int
	FNumber      *float64
	ExposureTime *string
	FocalLength  *string
	WhiteBalance *string
	Orientation  *string
	TakenAt      *time.Time
	CreatedAt    time.Time
	UpdatedAt    time.Time
}

// PhotoGPS は緯度経度情報（DB用）
type PhotoGPS struct {
	PhotoID   int64
	Latitude  *float64
	Longitude *float64
	IsVisible bool
	CreatedAt time.Time
	UpdatedAt time.Time
}
