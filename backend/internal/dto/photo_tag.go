package dto

// タグに紐づく写真と並び順
type PhotoWithSortOrder struct {
	PhotoID   int64  `json:"photo_id"`
	URL       string `json:"url"`
	SortOrder int    `json:"sort_order"`
}

type PhotoTagSortUpdate struct {
	PhotoID   int64 `json:"photo_id"`
	SortOrder int   `json:"sort_order"`
}
