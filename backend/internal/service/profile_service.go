package service

import (
	"backend/internal/domain"
	"backend/internal/repository"
)

// インターフェース
type ProfileService interface {
	GetProfile(userID int64) (*domain.Profile, error)
	CreateProfile(profile *domain.Profile) error
	UpdateProfile(profile *domain.Profile) error
}

// プロフィールサービスストラクチャー
type profileService struct {
	profileRepo repository.ProfileRepository
}

// 依存用
func NewProfileService(profileRepo repository.ProfileRepository) ProfileService {
	return &profileService{profileRepo}
}

// ユーザーIDでプロフィールを取得
func (s *profileService) GetProfile(userID int64) (*domain.Profile, error) {
	profile, err := s.profileRepo.GetProfileByUserID(userID)
	if err != nil {
		return nil, err
	}
	return profile, nil
}

// プロフィールの新規作成
func (s *profileService) CreateProfile(profile *domain.Profile) error {
	return s.profileRepo.CreateProfile(profile)
}

// プロフィールを更新
func (s *profileService) UpdateProfile(profile *domain.Profile) error {
	return s.profileRepo.UpdateProfile(profile)
}
