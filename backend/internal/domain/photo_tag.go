package domain

// タグに紐づく写真と並び順
type PhotoWithSortOrder struct {
	PhotoID   int64
	URL       string
	SortOrder int
}

// 並び順更新用
type PhotoTagSortUpdate struct {
	PhotoID   int64
	SortOrder int
}
