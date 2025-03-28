package usecase

import (
	"backend/internal/domain"
	"backend/internal/dto"
	"backend/internal/service"
	"backend/internal/usecase/converter"
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
	imageService   service.ImageService
}

// 依存注入用
func NewProfileUsecase(profileService service.ProfileService, imageService service.ImageService) ProfileUsecase {
	return &profileUsecase{profileService, imageService}
}

// プローフィルを取得し、変換して返却
func (u *profileUsecase) GetUserProfile(userID int64) (*dto.UserProfileResponse, error) {
	profile, err := u.profileService.GetProfile(userID)
	if err != nil {
		return nil, err
	}
	if profile == nil {
		return nil, errors.New("プロフィールが存在しません")
	}
	return converter.ConvertToUserProfileResponse(profile), nil
}

// プロフィール新規登録
func (u *profileUsecase) CreateUserProfile(userID int64, req *dto.CreateProfileRequest) (*dto.UserProfileResponse, error) {
	// 既存のプロフィールがあるか確認
	existingProfile, err := u.profileService.GetProfile(int64(userID))
	if err != nil {
		return nil, err
	}
	if existingProfile != nil {
		return nil, errors.New("プロフィールが存在しません")
	}

	// スライス化(nil対策)
	snsLinks := []domain.SNSLink{}
	if req.SNSLinks != nil {
		snsLinks = *req.SNSLinks
	}

	// 新規プロフィールを作成
	profile := &domain.Profile{
		UserID:      userID,
		DisplayName: req.DisplayName,
		Avatar:      req.Avatar,
		CoverImage:  req.CoverImage,
		Bio:         req.Bio,
		JobTitle:    req.JobTitle,
		Website:     req.Website,
		Location:    req.Location,
		BirthPlace:  req.BirthPlace,
		SNSLinks:    snsLinks,
		IsPublic:    true,
	}

	// プロフィールの保存
	err = u.profileService.CreateProfile(profile)
	if err != nil {
		return nil, err
	}

	// 変換して返却
	return converter.ConvertToUserProfileResponse(profile), nil
}

// プロフィールの更新
func (u *profileUsecase) UpdateUserProfile(userID int64, req *dto.UpdateProfileRequest) (*dto.UserProfileResponse, error) {
	// 既存のプロフィールを取得
	profile, err := u.profileService.GetProfile(userID)
	if err != nil {
		return nil, err
	}
	if profile == nil {
		return nil, errors.New("プロフィールが存在しません")
	}

	// プロフィールを更新
	// 更新処理（null許容のため個別チェック）
	if req.DisplayName != nil {
		profile.DisplayName = *req.DisplayName
	}
	profile.Avatar = req.Avatar
	profile.CoverImage = req.CoverImage
	profile.Bio = req.Bio
	profile.JobTitle = req.JobTitle
	profile.Website = req.Website
	profile.Location = req.Location
	profile.BirthPlace = req.BirthPlace
	if req.SNSLinks != nil {
		profile.SNSLinks = *req.SNSLinks
	}

	// 更新
	err = u.profileService.UpdateProfile(profile)
	if err != nil {
		return nil, err
	}

	// 変換して返却
	return converter.ConvertToUserProfileResponse(profile), nil
}

// アバター画像アップロード
func (u *profileUsecase) UploadAvatar(userID int64, file *multipart.FileHeader) (string, error) {
	return u.imageService.SaveAvatar(userID, file)
}
