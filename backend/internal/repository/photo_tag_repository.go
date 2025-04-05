package repository

import (
	"backend/internal/domain"
	"backend/internal/model"
	"context"

	"gorm.io/gorm"
)

// インターフェース
type PhotoTagRepository interface {
	FindPhotosByTagID(ctx context.Context, tagID int64) ([]*domain.PhotoWithSortOrder, error)
	UpdateSortOrders(ctx context.Context, tagID int64, updates []domain.PhotoTagSortUpdate) error
}

// 構造体
type photoTagRepository struct {
	db *gorm.DB
}

// 依存注入用
func NewPhotoTagRepository(db *gorm.DB) PhotoTagRepository {
	return &photoTagRepository{db}
}

// 指定したタグに紐づく写真一覧を取得する
func (r *photoTagRepository) FindPhotosByTagID(ctx context.Context, tagID int64) ([]*domain.PhotoWithSortOrder, error) {
	type result struct {
		PhotoID   int64
		ImageURL  string
		SortOrder int
	}

	var rows []result

	// DBからデータを取得
	err := r.db.WithContext(ctx).
		Table("photo_tags").
		Select("photo_tags.photo_id, photos.image_url, photo_tags.sort_order").
		Joins("JOIN photos ON photos.id = photo_tags.photo_id").
		Where("photo_tags.tag_id = ?", tagID).
		Order("photo_tags.sort_order ASC").
		Scan(&rows).Error

	if err != nil {
		return nil, err
	}

	// domainに変換
	photos := make([]*domain.PhotoWithSortOrder, 0, len(rows))
	for _, row := range rows {
		photos = append(photos, &domain.PhotoWithSortOrder{
			PhotoID:   row.PhotoID,
			URL:       row.ImageURL,
			SortOrder: row.SortOrder,
		})
	}

	return photos, nil
}

// 並び順を更新
func (r *photoTagRepository) UpdateSortOrders(ctx context.Context, tagID int64, updates []domain.PhotoTagSortUpdate) error {
	updateMap := make(map[int64]int)
	for _, u := range updates {
		updateMap[u.PhotoID] = u.SortOrder
	}

	// 更新処理
	return r.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		var photoTags []model.PhotoTag
		if err := tx.Where("tag_id = ?", tagID).Find(&photoTags).Error; err != nil {
			return err
		}

		for _, pt := range photoTags {
			order := 0
			if v, ok := updateMap[pt.PhotoID]; ok {
				order = v
			}
			if err := tx.Model(&pt).Update("sort_order", order).Error; err != nil {
				return err
			}
		}

		return nil
	})
}
