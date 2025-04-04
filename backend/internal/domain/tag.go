package domain

// ビジネスロジックで使用
type Tag struct {
	ID         int64
	Name       string
	CategoryID *int64
	SortOrder  int
}
