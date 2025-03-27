package service

import (
	"backend/internal/domain"
	"backend/internal/infrastructure"
	"backend/internal/repository"
	"fmt"
	"mime/multipart"
	"os"
	"path/filepath"
	"time"
)

// インターフェース
type ProfileService interface {
	GetProfile(userID int64) (*domain.Profile, error)
	CreateProfile(profile *domain.Profile) error
	UpdateProfile(profile *domain.Profile) error
	SaveAvatar(userID int64, file *multipart.FileHeader) (string, error)
}

// プロフィールサービスストラクチャー
type profileService struct {
	profileRepo repository.ProfileRepository
	imageSaver  infrastructure.ImageSaver
}

// 依存用
func NewProfileService(profileRepo repository.ProfileRepository, imageSaver infrastructure.ImageSaver) ProfileService {
	return &profileService{profileRepo, imageSaver}
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

// アイコン画像を保存
func (s *profileService) SaveAvatar(userID int64, file *multipart.FileHeader) (string, error) {
	// 保存ディレクトリ
	saveDir := filepath.Join(s.imageSaver.BasePath(), "profile")

	// 古い画像を削除
	pattern := fmt.Sprintf("user_%d_*.webp", userID)
	matches, _ := filepath.Glob(filepath.Join(saveDir, pattern))
	for _, m := range matches {
		os.Remove(m)
	}

	// 新しいファイルパスを作成
	timestamp := time.Now().Format("2006010215045")
	filename := fmt.Sprintf("user_%d_%s.webp", userID, timestamp)

	// ファイル保存
	url, err := s.imageSaver.Save(file, "profile", filename)
	if err != nil {
		return "", err
	}
	return url, nil
}
