package dto

// 返却用
type TagResponse struct {
	ID         int64  `json:"id"`
	Name       string `json:"name"`
	CategoryID *int64 `json:"category_id"`
	SortOrder  int    `json:"sort_order"`
}
