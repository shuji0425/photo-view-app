package repository

import (
	"backend/internal/domain"

	"gorm.io/gorm"
)

// インターフェース
type PhotoRepository interface {
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

// 1枚の写真情報を登録
func (r *photoRepository) SavePhoto(photo *domain.Photo) (int64, error) {
	result := r.db.Create(photo)
	if result.Error != nil {
		return 0, result.Error
	}
	return photo.ID, nil
}
