package domain

import "time"

// PhotoExif はメタデータ（DB用）
type PhotoExif struct {
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
