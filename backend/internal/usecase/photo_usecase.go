package usecase

import (
	"backend/internal/dto"
	"backend/internal/service"
	"backend/internal/usecase/converter"
	"mime/multipart"
)

// インターフェース
type PhotoUsecase interface {
	GetPhotoByIDs(ids []int64) ([]dto.PhotoDetail, error)
	UploadPhotos(userID int64, files []*multipart.FileHeader) (*dto.PhotoUploadResponse, error)
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

// 複数画像を保存
func (u *photoUsecase) UploadPhotos(userID int64, files []*multipart.FileHeader) (*dto.PhotoUploadResponse, error) {
	ids, err := u.photoService.SaveUploadPhotos(userID, files)
	if err != nil {
		return nil, err
	}
	return &dto.PhotoUploadResponse{
		PhotoIDs: ids,
	}, nil
}
