package model

import "time"

type PhotoExif struct {
	PhotoID      int64 `gorm:"primaryKey"`
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

func (PhotoExif) TableName() string {
	return "photo_exif"
}
