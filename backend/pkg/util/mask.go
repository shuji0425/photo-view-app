package util

import "time"

// 表示などのポリシーで使用
func IfVisible[T any](ok bool, val *T) *T {
	if ok {
		return val
	}
	return nil
}

func IfVisibleInt(ok bool, val *int) *int {
	if ok {
		return val
	}
	return nil
}

func IfVisibleFloat(ok bool, val *float64) *float64 {
	if ok {
		return val
	}
	return nil
}

func IfVisibleTime(ok bool, val *time.Time) *time.Time {
	if ok {
		return val
	}
	return nil
}
