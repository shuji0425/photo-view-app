package usecase

import (
	"backend/internal/domain"
	"backend/internal/dto"
	"backend/internal/service"
	"errors"
	"mime/multipart"
)

// インターフェース
type ProfileUsecase interface {
	GetUserProfile(userID int64) (*dto.UserProfileResponse, error)
	CreateUserProfile(userID int64, req *dto.CreateProfileRequest) (*dto.UserProfileResponse, error)
	UpdateUserProfile(userID int64, req *dto.UpdateProfileRequest) (*dto.UserProfileResponse, error)
	UploadAvatar(userID int64, file *multipart.FileHeader) (string, error)
}

// 構造体
type profileUsecase struct {
	profileService service.ProfileService
}

// 依存注入用
func NewProfileUsecase(profileService service.ProfileService) ProfileUsecase {
	return &profileUsecase{profileService}
}

// プローフィルを取得し、変換して返却
func (u *profileUsecase) GetUserProfile(userID int64) (*dto.UserProfileResponse, error) {
	profile, err := u.profileService.GetProfile(userID)
	if err != nil {
		return nil, err
	}
	if profile == nil {
		return nil, errors.New("profile not found")
	}
	return ConvertToUserProfileResponse(profile), nil
}

// プロフィール新規登録
func (u *profileUsecase) CreateUserProfile(userID int64, req *dto.CreateProfileRequest) (*dto.UserProfileResponse, error) {
	// 既存のプロフィールがあるか確認
	existingProfile, err := u.profileService.GetProfile(int64(userID))
	if err != nil {
		return nil, err
	}
	if existingProfile != nil {
		return nil, errors.New("profile already exists")
	}

	// 新規プロフィールを作成
	profile := &domain.Profile{
		UserID:   userID,
		Avatar:   req.Avatar,
		Bio:      req.Bio,
		Website:  req.Website,
		Location: req.Location,
	}

	// プロフィールの保存
	err = u.profileService.CreateProfile(profile)
	if err != nil {
		return nil, err
	}

	// 変換して返却
	return ConvertToUserProfileResponse(profile), nil
}

// プロフィールの更新
func (u *profileUsecase) UpdateUserProfile(userID int64, req *dto.UpdateProfileRequest) (*dto.UserProfileResponse, error) {
	// 既存のプロフィールを取得
	profile, err := u.profileService.GetProfile(userID)
	if err != nil {
		return nil, err
	}
	if profile == nil {
		return nil, errors.New("profile not found")
	}

	// プロフィールを更新
	profile.Avatar = req.Avatar
	profile.Bio = req.Bio
	profile.Website = req.Website
	profile.Location = req.Location

	err = u.profileService.UpdateProfile(profile)
	if err != nil {
		return nil, err
	}

	// 変換して返却
	return ConvertToUserProfileResponse(profile), nil
}

// アバター画像アップロード
func (u *profileUsecase) UploadAvatar(userID int64, file *multipart.FileHeader) (string, error) {
	return u.profileService.SaveAvatar(userID, file)
}
