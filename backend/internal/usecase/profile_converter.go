package usecase

import (
	"backend/internal/domain"
	"backend/internal/dto"
)

// domain to dto 変換
func ConvertToUserProfileResponse(profile *domain.Profile) *dto.UserProfileResponse {
	return &dto.UserProfileResponse{
		UserID:   profile.UserID,
		Avatar:   profile.Avatar,
		Bio:      profile.Bio,
		Website:  profile.Website,
		Location: profile.Location,
	}
}
