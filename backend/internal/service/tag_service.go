package service

import (
	"backend/internal/domain"
	"backend/internal/repository"
	"context"
)

// インターフェース
type TagService interface {
	GetAllTags(ctx context.Context) ([]*domain.Tag, error)
	SuggestTags(ctx context.Context, query string) ([]*domain.Tag, error)
	GetDefaultTag(ctx context.Context) (*domain.Tag, error)
	UpdateSortOrders(ctx context.Context, tags []domain.TagSortUpdate) error
}

// 構造体
type tagService struct {
	tagRepo repository.TagRepository
}

// 依存注入用
func NewTagService(tagRepo repository.TagRepository) TagService {
	return &tagService{tagRepo}
}

// タグを全件取得
func (s *tagService) GetAllTags(ctx context.Context) ([]*domain.Tag, error) {
	return s.tagRepo.GetAll(ctx)
}

// タグ候補を取得
func (s *tagService) SuggestTags(ctx context.Context, query string) ([]*domain.Tag, error) {
	return s.tagRepo.FindByQuery(ctx, query)
}

// デフォルトタグを1件取得
func (s *tagService) GetDefaultTag(ctx context.Context) (*domain.Tag, error) {
	return s.tagRepo.FindDefaultTag(ctx)
}

// タグ並び順を更新
func (s *tagService) UpdateSortOrders(ctx context.Context, tags []domain.TagSortUpdate) error {
	return s.tagRepo.UpdateSortOrders(ctx, tags)
}
