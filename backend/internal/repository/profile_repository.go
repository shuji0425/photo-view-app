package repository

import (
	"backend/internal/domain"
	"errors"

	"gorm.io/gorm"
)

// インターフェース
type ProfileRepository interface {
	GetProfileByUserID(userID int64) (*domain.Profile, error)
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
	var profile domain.Profile
	// 見つからないときはnilを返却
	if err := r.db.Where("user_id = ?", userID).First(&profile).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}

	return &profile, nil
}

// プロフィールを作成
func (r *profileRepository) CreateProfile(profile *domain.Profile) error {
	return r.db.Create(profile).Error
}

// プロフィールを保存
func (r *profileRepository) UpdateProfile(profile *domain.Profile) error {
	return r.db.Save(profile).Error
}
