package domain

import "time"

// Photo は画像投稿のメイン情報
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
	Tags        []string
	CreatedAt   time.Time
	UpdatedAt   time.Time
}

// 写真詳細
type PublicPhotoDetail struct {
	Photo *Photo
	Exif  *PhotoExif
	GPS   *PhotoGPS
	Tags  []*Tag
}
