package repository

import (
	"backend/internal/domain"

	"gorm.io/gorm"
)

// インターフェース
type PhotoRepository interface {
	GetPhotoByIDs(ids []int64) ([]*domain.Photo, error)
	SavePhoto(photo *domain.Photo) (int64, error)
}

// 構造体
type photoRepository struct {
	db *gorm.DB
}

// 依存注入用
func NewPhotoRepository(db *gorm.DB) PhotoRepository {
	return &photoRepository{db}
}

// idの配列から画像情報を取得
func (r *photoRepository) GetPhotoByIDs(ids []int64) ([]*domain.Photo, error) {
	var photos []*domain.Photo
	if err := r.db.Where("id IN ?", ids).Find(&photos).Error; err != nil {
		return nil, err
	}
	return photos, nil
}

// 1枚の写真情報を登録
func (r *photoRepository) SavePhoto(photo *domain.Photo) (int64, error) {
	result := r.db.Create(photo)
	if result.Error != nil {
		return 0, result.Error
	}
	return photo.ID, nil
}
