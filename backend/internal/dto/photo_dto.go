package dto

import "time"

// PhotoUploadResponse は画像アップロード後に返すID配列
type PhotoUploadResponse struct {
	PhotoIDs []int64 `json:"photo_ids"`
}

// 返却用
type PhotoDetail struct {
	ID          int64      `json:"id"`
	ImageURL    string     `json:"image_url"`
	AspectRatio float64    `json:"aspect_ratio"`
	Title       *string    `json:"title,omitempty"`
	Description *string    `json:"description,omitempty"`
	CategoryID  *int64     `json:"category_id"`
	UserID      *int64     `json:"user_id"`
	IsVisible   bool       `json:"is_visible"`
	TakenAt     *time.Time `json:"taken_at"`
}

// ページネーション用返却
type PaginatedPhotoResponse struct {
	Photos []PhotoDetail `json:"photos"`
	Total  int64         `json:"total"`
	Page   int           `json:"page"`
	Limit  int           `json:"limit"`
}
