package dto

import (
	"encoding/json"

	"gorm.io/datatypes"
)

// 新規プロフィール作成のリクエスト
type CreateProfileRequest struct {
	DisplayName string             `json:"display_name"`
	Avatar      *string            `json:"avatar"`
	CoverImage  *string            `json:"cover_image"`
	Bio         *string            `json:"bio"`
	JobTitle    *string            `json:"job_title"`
	Website     *string            `json:"website"`
	Location    *string            `json:"location"`
	BirthPlace  *string            `json:"birth_place"`
	SNSLinks    *map[string]string `json:"sns_links"`
}

// プロフィール更新のリクエスト
type UpdateProfileRequest struct {
	DisplayName *string            `json:"display_name"`
	Avatar      *string            `json:"avatar"`
	CoverImage  *string            `json:"cover_image"`
	Bio         *string            `json:"bio"`
	JobTitle    *string            `json:"job_title"`
	Website     *string            `json:"website"`
	Location    *string            `json:"location"`
	BirthPlace  *string            `json:"birth_place"`
	SNSLinks    *map[string]string `json:"sns_links"`
}

// API のレスポンス
type UserProfileResponse struct {
	DisplayName string            `json:"display_name"`
	Avatar      *string           `json:"avatar"`
	CoverImage  *string           `json:"cover_image"`
	Bio         *string           `json:"bio"`
	JobTitle    *string           `json:"job_title"`
	Website     *string           `json:"website"`
	Location    *string           `json:"location"`
	BirthPlace  *string           `json:"birth_place"`
	SNSLinks    map[string]string `json:"sns_links"`
}

// map から JSON へ変換(登録)
func (r *CreateProfileRequest) MarshalSNSLinks() datatypes.JSON {
	jsonBytes, _ := json.Marshal(r.SNSLinks)
	return datatypes.JSON(jsonBytes)
}

// map から JSON へ変換(変更)
func (r *UpdateProfileRequest) MarshalSNSLinks() datatypes.JSON {
	jsonBytes, _ := json.Marshal(r.SNSLinks)
	return datatypes.JSON(jsonBytes)
}
