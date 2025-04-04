package service

import (
	"backend/internal/domain"
	"backend/internal/repository"
	"context"
)

// インターフェース
type TagService interface {
	SuggestTags(ctx context.Context, query string) ([]*domain.Tag, error)
}

// 構造体
type tagService struct {
	tagRepo repository.TagRepository
}

// 依存注入用
func NewTagService(tagRepo repository.TagRepository) TagService {
	return &tagService{tagRepo}
}

// 仮データ
var dummyTags = []string{
	"桜", "サクラ", "櫻", "風景", "夜景", "自然", "旅行", "猫", "人物", "街",
}

// タグ候補を取得
func (s *tagService) SuggestTags(ctx context.Context, query string) ([]*domain.Tag, error) {
	return s.tagRepo.FindByQuery(ctx, query)
}
