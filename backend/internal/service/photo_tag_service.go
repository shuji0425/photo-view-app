package service

import (
	"backend/internal/domain"
	"backend/internal/repository"
	"context"
)

// インターフェース
type PhotoTagService interface {
	GetPhotosByTagID(ctx context.Context, tagID int64) ([]*domain.PhotoWithSortOrder, error)
	UpdateSortOrders(ctx context.Context, tagID int64, updates []domain.PhotoTagSortUpdate) error
}

// 構造体
type photoTagService struct {
	photoTagRepo repository.PhotoTagRepository
}

// 依存注入用
func NewPhotoTagService(photoTagRepo repository.PhotoTagRepository) PhotoTagService {
	return &photoTagService{photoTagRepo}
}

// 指定タグに紐づく写真を取得
func (s *photoTagService) GetPhotosByTagID(ctx context.Context, tagID int64) ([]*domain.PhotoWithSortOrder, error) {
	return s.photoTagRepo.FindPhotosByTagID(ctx, tagID)
}

// 並び順を更新
func (s *photoTagService) UpdateSortOrders(ctx context.Context, tagID int64, updates []domain.PhotoTagSortUpdate) error {
	return s.photoTagRepo.UpdateSortOrders(ctx, tagID, updates)
}
