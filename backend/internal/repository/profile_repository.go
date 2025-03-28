package repository

import (
	"backend/internal/domain"
	"backend/internal/repository/converter"
	"errors"

	"gorm.io/datatypes"
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
	type dbProfile struct {
		domain.Profile
		SNSLinks datatypes.JSON `gorm:"column:sns_links"`
	}

	var dbProf dbProfile
	result := r.db.Where("user_id = ?", userID).First(&dbProf)
	// 見つからないときはnilを返却
	if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		return nil, nil
	}

	// SNSLinksを変換
	links, err := converter.UnmarshalSNSLinks(dbProf.SNSLinks)
	if err != nil {
		return nil, err
	}
	dbProf.Profile.SNSLinks = links

	return &dbProf.Profile, result.Error
}

// プロフィールを作成
func (r *profileRepository) CreateProfile(profile *domain.Profile) error {
	jsonData, err := converter.MarshalSNSLinks(&profile.SNSLinks)
	if err != nil {
		return err
	}

	type dbProfile struct {
		domain.Profile
		SNSLinks datatypes.JSON `gorm:"column:sns_links"`
	}

	dbProf := dbProfile{
		Profile:  *profile,
		SNSLinks: jsonData,
	}

	return r.db.Create(&dbProf).Error
}

// プロフィールを保存
func (r *profileRepository) UpdateProfile(profile *domain.Profile) error {
	jsonData, err := converter.MarshalSNSLinks(&profile.SNSLinks)
	if err != nil {
		return err
	}

	type dbProfile struct {
		domain.Profile
		SNSLinks datatypes.JSON `gorm:"column:sns_links"`
	}

	dbProf := dbProfile{
		Profile:  *profile,
		SNSLinks: jsonData,
	}

	return r.db.Save(&dbProf).Error
}
