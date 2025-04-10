package usecase

import (
	"backend/internal/converter"
	"backend/internal/domain"
	"backend/internal/dto"
	"backend/internal/service"
	"context"
)

// インターフェース
type PhotoTagUsecase interface {
	GetPhotosByTagID(ctx context.Context, tagID int64) ([]*dto.PhotoWithSortOrder, error)
	GetPhotosByTagIDForPublic(ctx context.Context, tagID int64) ([]*dto.PhotoPublicDTO, error)
	UpdateSortOrders(ctx context.Context, tagID int64, updates []domain.PhotoTagSortUpdate) error
}

// 構造体
type photoTagUsecase struct {
	photoTagService service.PhotoTagService
}

// 依存注入用
func NewPhotoTagUsecase(photoTagService service.PhotoTagService) PhotoTagUsecase {
	return &photoTagUsecase{photoTagService}
}

// 指定タグに紐づく写真を取得
func (u *photoTagUsecase) GetPhotosByTagID(ctx context.Context, tagID int64) ([]*dto.PhotoWithSortOrder, error) {
	photos, err := u.photoTagService.GetPhotosByTagID(ctx, tagID)
	if err != nil {
		return nil, err
	}

	return converter.ToDtoPhotoWithSortOrders(photos), nil
}

// 並び順を更新
func (u *photoTagUsecase) UpdateSortOrders(ctx context.Context, tagID int64, updates []domain.PhotoTagSortUpdate) error {
	return u.photoTagService.UpdateSortOrders(ctx, tagID, updates)
}

// ----------- 公開用 -----------------

// 指定タグに紐づく写真を取得（公開用）
func (u *photoTagUsecase) GetPhotosByTagIDForPublic(ctx context.Context, tagID int64) ([]*dto.PhotoPublicDTO, error) {
	photos, err := u.photoTagService.GetPhotosByTagID(ctx, tagID)
	if err != nil {
		return nil, err
	}

	return converter.ToDtoPhotosPublic(photos), nil
}
