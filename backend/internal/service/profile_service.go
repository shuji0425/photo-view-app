package service

import (
	"backend/internal/domain"
	"backend/internal/repository"
	"context"
)

// インターフェース
type ProfileService interface {
	GetProfile(userID int64) (*domain.Profile, error)
	GetFirstAdminProfile(ctx context.Context) (*domain.Profile, error)
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
	return s.profileRepo.GetProfileByUserID(userID)
}

// 管理者の1番若いIDのユーザーを取得
func (s *profileService) GetFirstAdminProfile(ctx context.Context) (*domain.Profile, error) {
	return s.profileRepo.FindFirstAdminProfile(ctx)
}

// プロフィールの新規作成
func (s *profileService) CreateProfile(profile *domain.Profile) error {
	return s.profileRepo.CreateProfile(profile)
}

// プロフィールを更新
func (s *profileService) UpdateProfile(profile *domain.Profile) error {
	return s.profileRepo.UpdateProfile(profile)
}
