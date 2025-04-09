package usecase

import (
	"backend/internal/converter"
	"backend/internal/dto"
	"backend/internal/service"
	"context"
	"mime/multipart"
)

// インターフェース
type PhotoUsecase interface {
	GetPhotoByIDs(ids []int64) ([]*dto.PhotoDetail, error)
	GetPaginatedPhotos(page, limit int) (*dto.PaginatedPhotoResponse, error)
	GetPublicPhotoDetail(ctx context.Context, photoID int64) (*dto.PublicPhotoDetailDTO, error)
	UploadPhotos(ctx context.Context, userID int64, files []*multipart.FileHeader) (*dto.PhotoUploadResponse, error)
	BulkUpdatePhotos(ctx context.Context, reqs dto.PhotoBulkUpdateRequest) error
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
func (u *photoUsecase) GetPhotoByIDs(ids []int64) ([]*dto.PhotoDetail, error) {
	photos, err := u.photoService.GetPhotosByIDs(ids)
	if err != nil {
		return nil, err
	}
	return converter.ToDetailsList(photos), nil
}

// ページネーション付きの画像一覧を返す
func (u *photoUsecase) GetPaginatedPhotos(page, limit int) (*dto.PaginatedPhotoResponse, error) {
	photos, total, err := u.photoService.GetPaginatedPhotos(page, limit)
	if err != nil {
		return nil, err
	}

	return &dto.PaginatedPhotoResponse{
		Photos: converter.ToDetailsList(photos),
		Total:  total,
		Page:   page,
		Limit:  limit,
	}, nil
}

// idに紐づく写真情報と詳細情報を取得
func (u *photoUsecase) GetPublicPhotoDetail(ctx context.Context, photoID int64) (*dto.PublicPhotoDetailDTO, error) {
	detail, err := u.photoService.GetPublicPhotoDetail(ctx, photoID)
	if err != nil {
		return nil, err
	}
	if detail == nil {
		return nil, nil
	}

	return converter.ToPublicPhotoDetailResponse(detail), nil
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

// 複数の画像とタグ情報を更新
func (u *photoUsecase) BulkUpdatePhotos(ctx context.Context, reqs dto.PhotoBulkUpdateRequest) error {
	for i := range reqs.Updates {
		req := reqs.Updates[i]
		// 1件でもエラーが出たら終了
		domainPhoto := converter.ToPhotoFromUpdateDTO(&req)
		if err := u.photoService.UpdatePhotoWithTags(ctx, domainPhoto); err != nil {
			return err
		}
	}
	return nil
}

// idの配列から画像を削除
func (u *photoUsecase) DeletePhotosByIDs(ids []int64) error {
	return u.photoService.DeletePhotosByIDs(ids)
}
