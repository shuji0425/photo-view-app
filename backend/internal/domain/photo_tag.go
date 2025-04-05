package domain

// タグに紐づく写真と並び順
type PhotoWithSortOrder struct {
	PhotoID   int64
	URL       string
	SortOrder int
}
