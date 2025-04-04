package repository

import (
	"backend/internal/converter"
	"backend/internal/domain"
	"backend/internal/model"
	"context"
	"errors"

	"gorm.io/gorm"
)

// インターフェース
type ProfileRepository interface {
	GetProfileByUserID(userID int64) (*domain.Profile, error)
	FindFirstAdminProfile(ctx context.Context) (*domain.Profile, error)
	CreateProfile(profile *domain.Profile) error
	UpdateProfile(profile *domain.Profile) error
}

// 構造体
type profileRepository struct {
	db *gorm.DB
}

// 依存注入用
func NewProfileRepository(db *gorm.DB) ProfileRepository {
	return &profileRepository{db}
}

// プロフィールを取得
func (r *profileRepository) GetProfileByUserID(userID int64) (*domain.Profile, error) {
	var profile *model.Profile
	// 見つからないときはnilを返却
	if err := r.db.Model(&model.Profile{}).Where("user_id = ?", userID).First(&profile).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}

	return converter.ToDomainProfile(profile), nil
}

// 最も若いIDの管理者プロフィールを取得
func (r *profileRepository) FindFirstAdminProfile(ctx context.Context) (*domain.Profile, error) {
	var profile model.Profile
	err := r.db.WithContext(ctx).
		Joins("JOIN users ON users.id = profiles.user_id").
		Where("users.role = ?", "admin").
		Order("users.id ASC").
		Limit(1).
		First(&profile).Error
	if err != nil {
		return nil, err
	}

	return converter.ToDomainProfile(&profile), nil
}

// プロフィールを作成
func (r *profileRepository) CreateProfile(profile *domain.Profile) error {
	return r.db.Create(converter.ToModelProfile(profile)).Error
}

// プロフィールを保存
func (r *profileRepository) UpdateProfile(profile *domain.Profile) error {
	return r.db.Save(converter.ToModelProfile(profile)).Error
}
