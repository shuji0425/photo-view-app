package domain

import "time"

// タグに紐づく写真と並び順
type PhotoWithSortOrder struct {
	PhotoID     int64
	ImageURL    string
	Title       *string
	Description *string
	TakenAt     *time.Time
	SortOrder   int
}

// 並び順更新用
type PhotoTagSortUpdate struct {
	PhotoID   int64
	SortOrder int
}
