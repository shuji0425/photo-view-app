package model

import "time"

// DB保存用の構造体
type MetadataVisibilityPolicy struct {
	UserID           int64 `gorm:"primaryKey"`
	ShowCameraMake   bool
	ShowCameraModel  bool
	ShowLensModel    bool
	ShowISO          bool
	ShowFNumber      bool
	ShowExposureTime bool
	ShowFocalLength  bool
	ShowWhiteBalance bool
	ShowOrientation  bool
	ShowTakenAt      bool
	ShowGPS          bool
	CreatedAt        *time.Time `gorm:"autoCreateTime"`
	UpdatedAt        *time.Time `gorm:"autoUpdateTime"`
}
