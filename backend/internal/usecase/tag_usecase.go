package usecase

import (
	"backend/internal/converter"
	"backend/internal/domain"
	"backend/internal/dto"
	"backend/internal/service"
	"context"
)

// インターフェース
type TagUsecase interface {
	GetAllTags(ctx context.Context) ([]*dto.TagResponse, error)
	GetSuggestions(ctx context.Context, query string) ([]string, error)
	GetDefaultTag(ctx context.Context) (*dto.TagResponse, error)
	GetTagsWithPhotos(ctx context.Context) ([]*dto.TagResponse, error)
	UpdateSortOrders(ctx context.Context, tags []domain.TagSortUpdate) error
}

// 構造体
type tagUsecase struct {
	tagService service.TagService
}

// 依存注入用
func NewTagUsecase(tagService service.TagService) TagUsecase {
	return &tagUsecase{tagService}
}

// タグを全件取得
func (u *tagUsecase) GetAllTags(ctx context.Context) ([]*dto.TagResponse, error) {
	tags, err := u.tagService.GetAllTags(ctx)
	return converter.ToDtoTags(tags), err
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

// デフォルトタグを1件取得
func (u *tagUsecase) GetDefaultTag(ctx context.Context) (*dto.TagResponse, error) {
	tag, err := u.tagService.GetDefaultTag(ctx)
	return converter.ToDtoTag(tag), err
}

// タグ一覧を取得(写真に紐づいてないタグは除外)
func (u *tagUsecase) GetTagsWithPhotos(ctx context.Context) ([]*dto.TagResponse, error) {
	tags, err := u.tagService.GetTagsWithPhotos(ctx)
	return converter.ToDtoTags(tags), err
}

// タグの並び順を更新
func (u *tagUsecase) UpdateSortOrders(ctx context.Context, tags []domain.TagSortUpdate) error {
	return u.tagService.UpdateSortOrders(ctx, tags)
}
