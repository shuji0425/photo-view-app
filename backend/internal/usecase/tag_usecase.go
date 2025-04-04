package usecase

import "backend/internal/service"

// インターフェース
type TagUsecase interface {
	GetSuggestions(query string) []string
}

// 構造体
type tagUsecase struct {
	tagService service.TagService
}

// 依存注入用
func NewTagUsecase(tagService service.TagService) TagUsecase {
	return &tagUsecase{tagService}
}

func (u *tagUsecase) GetSuggestions(query string) []string {
	return u.tagService.SuggestTags(query)
}
