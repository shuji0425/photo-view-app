package usecase

import (
	"backend/internal/dto"
	"backend/internal/service"
	"backend/internal/usecase/converter"
	"context"
	"mime/multipart"
)

// インターフェース
type PhotoUsecase interface {
	GetPhotoByIDs(ids []int64) ([]dto.PhotoDetail, error)
	GetPaginatedPhotos(page, limit int) (*dto.PaginatedPhotoResponse, error)
	UploadPhotos(ctx context.Context, userID int64, files []*multipart.FileHeader) (*dto.PhotoUploadResponse, error)
	DeletePhotosByIDs(ids []int64) error
}

// 構造体
type photoUsecase struct {
	photoService service.PhotoService
}

// 依存注入用
func NewPhotoUsecase(photoService service.PhotoService) PhotoUsecase {
	return &photoUsecase{photoService}
}

// id配列から写真情報を取得
func (u *photoUsecase) GetPhotoByIDs(ids []int64) ([]dto.PhotoDetail, error) {
	photos, err := u.photoService.GetPhotosByIDs(ids)
	if err != nil {
		return nil, err
	}
	return converter.ConvertToDetailsResponse(photos), nil
}

// ページネーション付きの画像一覧を返す
func (u *photoUsecase) GetPaginatedPhotos(page, limit int) (*dto.PaginatedPhotoResponse, error) {
	photos, total, err := u.photoService.GetPaginatedPhotos(page, limit)
	if err != nil {
		return nil, err
	}

	return &dto.PaginatedPhotoResponse{
		Photos: converter.ConvertToDetailsResponse(photos),
		Total:  total,
		Page:   page,
		Limit:  limit,
	}, nil
}

// 複数画像を保存
func (u *photoUsecase) UploadPhotos(ctx context.Context, userID int64, files []*multipart.FileHeader) (*dto.PhotoUploadResponse, error) {
	ids, err := u.photoService.SaveUploadPhotos(ctx, userID, files)
	if err != nil {
		return nil, err
	}
	return &dto.PhotoUploadResponse{
		PhotoIDs: ids,
	}, nil
}

// idの配列から画像を削除
func (u *photoUsecase) DeletePhotosByIDs(ids []int64) error {
	return u.photoService.DeletePhotosByIDs(ids)
}
