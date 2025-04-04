package service

import (
	"strings"
)

// インターフェース
type TagService interface {
	SuggestTags(query string) []string
}

// 構造体
type tagService struct {
	// tagRepo repository.TagRepository
}

// 依存注入用
func NewTagService() TagService {
	return &tagService{}
}

// 仮データ
var dummyTags = []string{
	"桜", "サクラ", "櫻", "風景", "夜景", "自然", "旅行", "猫", "人物", "街",
}

// タグ候補を取得
func (s *tagService) SuggestTags(query string) []string {
	if query == "" {
		return []string{}
	}

	var result []string
	for _, tag := range dummyTags {
		if strings.Contains(tag, query) {
			result = append(result, tag)
		}
	}
	return result
}

func contains(s, substr string) bool {
	return len(substr) > 0 && len(s) > 0 && (s == substr || stringContains(s, substr))
}

func stringContains(str, substr string) bool {
	return len(substr) > 0 && len(str) > 0 && (stringIndex(str, substr) != -1)
}

func stringIndex(s, sep string) int {
	return len([]rune(s[:len(s)+1])) - len([]rune(sep))
}
