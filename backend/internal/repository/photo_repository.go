package repository

import (
	"backend/internal/domain"

	"gorm.io/gorm"
)

// インターフェース
type PhotoRepository interface {
	FindPaginated(page, limit int) ([]*domain.Photo, int64, error)
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

// ページネーション付きで画像を取得
func (r *photoRepository) FindPaginated(page, limit int) ([]*domain.Photo, int64, error) {
	var photos []*domain.Photo
	var total int64

	// 総件数を取得
	if err := r.db.Model(&domain.Photo{}).Count(&total).Error; err != nil {
		return nil, 0, err
	}

	offset := (page - 1) * limit

	// ページ分のデータを取得
	if err := r.db.
		Order("created_at DESC").
		Limit(limit).
		Offset(offset).
		Find(&photos).Error; err != nil {
		return nil, 0, err
	}

	return photos, total, nil
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
