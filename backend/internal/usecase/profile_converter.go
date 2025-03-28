package usecase

import (
	"backend/internal/domain"
	"backend/internal/dto"
	"encoding/json"
)

// domain to dto 変換
func ConvertToUserProfileResponse(profile *domain.Profile) *dto.UserProfileResponse {
	// SNSリンクをJSON から mapに変換
	var snsLinks map[string]string
	if profile.SNSLinks != nil {
		if err := json.Unmarshal(profile.SNSLinks, &snsLinks); err != nil {
			snsLinks = make(map[string]string)
		}
	}

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
		SNSLinks:    snsLinks,
	}
}
