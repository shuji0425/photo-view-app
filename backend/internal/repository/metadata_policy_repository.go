package repository

import (
	"backend/internal/converter"
	"backend/internal/domain"
	"backend/internal/model"
	"context"

	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

// インターフェース
type MetadataPolicyRepository interface {
	FindByUserID(ctx context.Context, userID int64) (*domain.MetadataVisibilityPolicy, error)
	CreateOrUpdate(ctx context.Context, policy *domain.MetadataVisibilityPolicy) error
}

// 構造体
type metadataPolicyRepository struct {
	db *gorm.DB
}

// 依存注入用
func NewMetadataPolicyRepository(db *gorm.DB) MetadataPolicyRepository {
	return &metadataPolicyRepository{db}
}

// ユーザーIDに紐づくメタデータ表示ポリシーを取得
func (r *metadataPolicyRepository) FindByUserID(ctx context.Context, userID int64) (*domain.MetadataVisibilityPolicy, error) {
	var policy model.MetadataVisibilityPolicy
	if err := r.db.WithContext(ctx).
		Where("user_id = ?", userID).
		First(&policy).Error; err != nil {
		return nil, err
	}
	return converter.ToDomainMetadataPolicy(&policy), nil
}

// メタデータ表示ポリシーを作成or更新
func (r *metadataPolicyRepository) CreateOrUpdate(ctx context.Context, policy *domain.MetadataVisibilityPolicy) error {
	modelPolicy := converter.ToModelMetadataPolicy(policy)
	return r.db.WithContext(ctx).
		Clauses(clause.OnConflict{
			Columns:   []clause.Column{{Name: "user_id"}},
			UpdateAll: true,
		}).
		Create(modelPolicy).Error
}
