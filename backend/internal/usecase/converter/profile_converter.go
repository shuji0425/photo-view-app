package converter

import (
	"backend/internal/domain"
	"backend/internal/dto"
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
