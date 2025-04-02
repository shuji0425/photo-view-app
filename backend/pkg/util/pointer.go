package util

// []*T -> []T に変換
func DeferSlice[T any](ptrs []*T) []T {
	result := make([]T, 0, len(ptrs))
	for _, p := range ptrs {
		if p != nil {
			result = append(result, *p)
		}
	}
	return result
}
