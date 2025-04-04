package usecase

import (
	"backend/internal/service"
	"context"
)

// インターフェース
type TagUsecase interface {
	GetSuggestions(ctx context.Context, query string) ([]string, error)
}

// 構造体
type tagUsecase struct {
	tagService service.TagService
}

// 依存注入用
func NewTagUsecase(tagService service.TagService) TagUsecase {
	return &tagUsecase{tagService}
}

// タグ名の配列のみを返却
func (u *tagUsecase) GetSuggestions(ctx context.Context, query string) ([]string, error) {
	tags, err := u.tagService.SuggestTags(ctx, query)
	if err != nil {
		return nil, err
	}

	names := make([]string, 0, len(tags))
	for _, tag := range tags {
		names = append(names, tag.Name)
	}

	return names, nil
}
