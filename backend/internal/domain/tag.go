package domain

// ビジネスロジックで使用
type Tag struct {
	ID         int64
	Name       string
	CategoryID *int64
	SortOrder  int
}

// 並び順更新用
type TagSortUpdate struct {
	ID        int64
	SortOrder int
}
