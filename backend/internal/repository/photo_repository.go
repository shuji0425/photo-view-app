package repository

import (
	"backend/internal/converter"
	"backend/internal/domain"
	"backend/internal/model"
	"context"
	"errors"
	"log"

	"gorm.io/gorm"
)

// インターフェース
type PhotoRepository interface {
	FindPaginated(page, limit int) ([]*domain.Photo, int64, error)
	GetPhotoByIDs(ids []int64) ([]*domain.Photo, error)
	FindPublicPhotoDetail(ctx context.Context, photoID int64) (*domain.PublicPhotoDetail, error)
	CreatePhotoWithMeta(ctx context.Context, photo *domain.Photo, exif *domain.PhotoExif, gps *domain.PhotoGPS) (int64, error)
	UpdateWithTags(ctx context.Context, req *domain.Photo) error
	DeleteByIDs(ids []int64) error
}

// 構造体
type photoRepository struct {
	db      *gorm.DB
	tagRepo TagRepository
}

// 依存注入用
func NewPhotoRepository(db *gorm.DB, tagRepo TagRepository) PhotoRepository {
	return &photoRepository{db, tagRepo}
}

// ページネーション付きで画像を取得
func (r *photoRepository) FindPaginated(page, limit int) ([]*domain.Photo, int64, error) {
	var modelPhotos []*model.Photo
	var total int64

	// 総件数を取得
	if err := r.db.Model(&model.Photo{}).Count(&total).Error; err != nil {
		return nil, 0, err
	}

	offset := (page - 1) * limit

	// ページ分のデータを取得
	if err := r.db.
		Order("created_at DESC").
		Limit(limit).
		Offset(offset).
		Find(&modelPhotos).Error; err != nil {
		return nil, 0, err
	}

	// model -> domain
	photos := converter.ToDomainPhotos(modelPhotos)

	return photos, total, nil
}

// idの配列から画像情報を取得
func (r *photoRepository) GetPhotoByIDs(ids []int64) ([]*domain.Photo, error) {
	var modelPhotos []*model.Photo
	if err := r.db.Where("id IN ?", ids).Find(&modelPhotos).Error; err != nil {
		return nil, err
	}

	// 写真ID -> タグ名一覧のマッピング
	var results []struct {
		PhotoID int64
		Name    string
	}
	err := r.db.
		Table("photo_tags").
		Select("photo_tags.photo_id, tags.name").
		Joins("JOIN tags ON photo_tags.tag_id = tags.id").
		Where("photo_tags.photo_id IN ?", ids).
		Scan(&results).Error
	if err != nil {
		return nil, err
	}

	// IDごとにグループ化
	tagMap := make(map[int64][]string)
	for _, row := range results {
		tagMap[row.PhotoID] = append(tagMap[row.PhotoID], row.Name)
	}

	// model -> domain
	photos := converter.ToDomainPhotos(modelPhotos)

	// domain.photoにtagsを詰める（ないときはnil）
	for _, photo := range photos {
		photo.Tags = tagMap[photo.ID]
	}

	return photos, nil
}

// 公開写真の詳細情報を取得
func (r *photoRepository) FindPublicPhotoDetail(ctx context.Context, photoID int64) (*domain.PublicPhotoDetail, error) {
	var photo model.Photo

	// 写真とそれに紐づくデータを取得（modelに紐付け必要）
	err := r.db.WithContext(ctx).
		Preload("Exif").
		Preload("GPS").
		Preload("Tags").
		Preload("User").
		Preload("User.MetadataVisibilityPolicy").
		Where("photos.id = ? AND photos.is_visible = TRUE", photoID).
		First(&photo).Error

	// 見つからない場合は終了
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, nil
	}

	if err != nil {
		return nil, err
	}

	// policy 取得
	var policy *model.MetadataVisibilityPolicy
	if photo.User != nil {
		policy = photo.User.MetadataVisibilityPolicy
	}

	if photo.User == nil {
		log.Println("photo.User is nil")
	} else if photo.User.MetadataVisibilityPolicy == nil {
		log.Println("MetadataVisibilityPolicy is nil")
	}

	return &domain.PublicPhotoDetail{
		Photo: converter.ToDomainPhoto(&photo),
		Exif:  converter.ToDomainExifWithPolicy(photo.Exif, policy),
		GPS:   converter.ToDomainGPSWithPolicy(photo.GPS, policy),
		Tags:  converter.ToDomainTags(photo.Tags),
	}, nil
}

// 1枚の写真情報を登録
func (r *photoRepository) CreatePhotoWithMeta(
	ctx context.Context,
	photo *domain.Photo,
	exif *domain.PhotoExif,
	gps *domain.PhotoGPS,
) (int64, error) {
	err := r.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		// Domain -> model 変換
		modelPhoto := converter.ToPhotoModel(photo)
		modelExif := converter.ToPhotoExifModel(exif)
		modelGps := converter.ToPhotoGPSModel(gps)

		// 写真テーブルに登録
		if err := tx.Create(modelPhoto).Error; err != nil {
			return err
		}

		// 返却するためにIDを入れる
		photo.ID = modelPhoto.ID

		// Exifテーブルに登録
		modelExif.PhotoID = photo.ID
		if err := tx.Create(modelExif).Error; err != nil {
			return err
		}

		// GPSテーブルに登録
		modelGps.PhotoID = photo.ID
		if err := tx.Create(modelGps).Error; err != nil {
			return err
		}

		return nil
	})

	if err != nil {
		return 0, err
	}

	return photo.ID, nil
}

// 写真情報とタグ情報を更新
func (r *photoRepository) UpdateWithTags(ctx context.Context, req *domain.Photo) error {
	return r.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		// 写真テーブルを更新
		photoModel := converter.ToPhotoModel(req)

		if err := tx.Model(&model.Photo{}).
			Where("id = ?", photoModel.ID).
			Select("is_visible", "title", "description", "category_id", "taken_at", "user_id").
			Updates(photoModel).Error; err != nil {
			return err
		}

		// 既存の photo_tags を取得して、sort_order を保持
		var existingRelations []model.PhotoTag
		if err := tx.Where("photo_id = ?", photoModel.ID).Find(&existingRelations).Error; err != nil {
			return err
		}
		sortMap := make(map[int64]int)
		for _, rel := range existingRelations {
			sortMap[rel.TagID] = rel.SortOrder
		}

		// タグを登録（IDも取得）
		tagIDs, err := r.tagRepo.FindOrCreateTags(tx, req.Tags)
		if err != nil {
			return err
		}

		// photo_tags 中間テーブルを一括削除
		if err := tx.Where("photo_id = ?", photoModel.ID).Delete(&model.PhotoTag{}).Error; err != nil {
			return err
		}

		// 中間テーブル再登録
		var relations []model.PhotoTag
		for _, tagID := range tagIDs {
			relations = append(relations, model.PhotoTag{
				PhotoID:   photoModel.ID,
				TagID:     tagID,
				SortOrder: sortMap[tagID],
			})
		}
		// タグがあれば登録
		if len(relations) > 0 {
			if err := tx.Create(&relations).Error; err != nil {
				return err
			}
		}

		return nil
	})
}

// id配列による削除
func (r *photoRepository) DeleteByIDs(ids []int64) error {
	if len(ids) == 0 {
		return nil
	}

	if err := r.db.Where("id IN ?", ids).Delete(&model.Photo{}).Error; err != nil {
		return err
	}

	return nil
}
