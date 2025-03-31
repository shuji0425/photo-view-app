package repository

import (
	"backend/internal/domain"
	"context"
	"log"

	"gorm.io/gorm"
)

// インターフェース
type PhotoRepository interface {
	FindPaginated(page, limit int) ([]*domain.Photo, int64, error)
	GetPhotoByIDs(ids []int64) ([]*domain.Photo, error)
	CreatePhotoWithMeta(ctx context.Context, photo *domain.Photo, exif *domain.PhotoExif, gps *domain.PhotoGPS) (int64, error)
	DeleteByIDs(ids []int64) error
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
func (r *photoRepository) CreatePhotoWithMeta(
	ctx context.Context,
	photo *domain.Photo,
	exif *domain.PhotoExif,
	gps *domain.PhotoGPS,
) (int64, error) {
	err := r.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		// 写真テーブルに登録
		if err := tx.Create(photo).Error; err != nil {
			return err
		}

		// Exifテーブルに登録
		exif.PhotoID = photo.ID
		if err := tx.Create(exif).Error; err != nil {
			log.Println("exifエラー: %w", err)
			return err
		}

		// GPSテーブルに登録
		gps.PhotoID = photo.ID
		if err := tx.Create(gps).Error; err != nil {
			log.Println("gpsエラー: %w", err)

			return err
		}

		return nil
	})

	if err != nil {
		return 0, err
	}

	return photo.ID, nil
}

// id配列による削除
func (r *photoRepository) DeleteByIDs(ids []int64) error {
	if len(ids) == 0 {
		return nil
	}

	if err := r.db.Where("id IN ?", ids).Delete(&domain.Photo{}).Error; err != nil {
		return err
	}

	return nil
}
