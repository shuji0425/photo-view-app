package converter

import (
	"backend/internal/domain"
	"backend/internal/dto"
	"backend/internal/model"
)

// domain to dto 変換
func ConvertToUserProfileResponse(profile *domain.Profile) *dto.UserProfileResponse {
	// 変換して返却
	return &dto.UserProfileResponse{
		DisplayName: profile.DisplayName,
		Avatar:      profile.Avatar,
		CoverImage:  profile.CoverImage,
		Bio:         profile.Bio,
		JobTitle:    profile.JobTitle,
		Website:     profile.Website,
		Location:    profile.Location,
		BirthPlace:  profile.BirthPlace,
		SNSLinks:    profile.SNSLinks,
		IsPublic:    profile.IsPublic,
	}
}

// model -> domain DBモデルをドメインモデルに変換
func ToDomainProfile(m *model.Profile) *domain.Profile {
	if m == nil {
		return nil
	}
	return &domain.Profile{
		UserID:      m.UserID,
		DisplayName: m.DisplayName,
		Avatar:      m.Avatar,
		CoverImage:  m.CoverImage,
		Bio:         m.Bio,
		JobTitle:    m.JobTitle,
		Website:     m.Website,
		Location:    m.Location,
		BirthPlace:  m.BirthPlace,
		SNSLinks:    m.SNSLinks,
		IsPublic:    m.IsPublic,
	}
}

// ドメインモデルをDBモデルに変換
func ToModelProfile(d *domain.Profile) *model.Profile {
	if d == nil {
		return nil
	}
	return &model.Profile{
		UserID:      d.UserID,
		DisplayName: d.DisplayName,
		Avatar:      d.Avatar,
		CoverImage:  d.CoverImage,
		Bio:         d.Bio,
		JobTitle:    d.JobTitle,
		Website:     d.Website,
		Location:    d.Location,
		BirthPlace:  d.BirthPlace,
		SNSLinks:    d.SNSLinks,
		IsPublic:    d.IsPublic,
	}
}
