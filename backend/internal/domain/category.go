package domain

import "time"

// カテゴリー
type Category struct {
	ID        int64
	Name      string
	SortOrder int
	CreatedAt time.Time
	UpdatedAt time.Time
}
