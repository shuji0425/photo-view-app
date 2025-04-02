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
	Tags        []string   `json:"tags"`
}

// ページネーション用返却
type PaginatedPhotoResponse struct {
	Photos []*PhotoDetail `json:"photos"`
	Total  int64          `json:"total"`
	Page   int            `json:"page"`
	Limit  int            `json:"limit"`
}

// 更新用（単体）
type PhotoUpdateRequest struct {
	PhotoID     int64      `json:"photo_id"`    // 対象写真ID
	Title       *string    `json:"title"`       // 任意
	Description *string    `json:"description"` // 任意
	CategoryID  *int64     `json:"category_id"` // 任意
	IsVisible   *bool      `json:"is_visible"`  // 公開/非公開
	TakenAt     *time.Time `json:"taken_at"`    // 撮影日（任意）
	Tags        []string   `json:"tags"`        // タグ名配列
}

// 更新用（複数）
type PhotoBulkUpdateRequest struct {
	Updates []PhotoUpdateRequest `json:"updates"`
}
