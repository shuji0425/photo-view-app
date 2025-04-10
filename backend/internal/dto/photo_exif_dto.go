package dto

import "time"

// Exif 情報レスポンス
type PhotoExifResponse struct {
	CameraMake   *string    `json:"camera_make,omitempty"`
	CameraModel  *string    `json:"camera_model,omitempty"`
	LensModel    *string    `json:"lens_model,omitempty"`
	ISO          *int       `json:"iso,omitempty"`
	FNumber      *float64   `json:"f_number,omitempty"`
	ExposureTime *string    `json:"exposure_time,omitempty"`
	FocalLength  *string    `json:"focal_length,omitempty"`
	WhiteBalance *string    `json:"white_balance,omitempty"`
	Orientation  *string    `json:"orientation,omitempty"`
	TakenAt      *time.Time `json:"taken_at,omitempty"` // 日時はフロント表示用に文字列化
}
