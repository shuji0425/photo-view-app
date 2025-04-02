package dto

import "backend/internal/domain"

// SNSリンク
type SNSLink = domain.SNSLink

// 新規プロフィール作成のリクエスト
type CreateProfileRequest struct {
	DisplayName string     `json:"display_name" binding:"required"`
	Avatar      *string    `json:"avatar"`
	CoverImage  *string    `json:"cover_image"`
	Bio         *string    `json:"bio"`
	JobTitle    *string    `json:"job_title"`
	Website     *string    `json:"website" binding:"omitempty,url"`
	Location    *string    `json:"location"`
	BirthPlace  *string    `json:"birth_place"`
	SNSLinks    *[]SNSLink `json:"sns_links"`
	IsPublic    bool       `json:"is_public"`
}

// プロフィール更新のリクエスト
type UpdateProfileRequest struct {
	DisplayName *string    `json:"display_name"`
	Avatar      *string    `json:"avatar"`
	CoverImage  *string    `json:"cover_image"`
	Bio         *string    `json:"bio"`
	JobTitle    *string    `json:"job_title"`
	Website     *string    `json:"website" binding:"omitempty,url"`
	Location    *string    `json:"location"`
	BirthPlace  *string    `json:"birth_place"`
	SNSLinks    *[]SNSLink `json:"sns_links"`
	IsPublic    bool       `json:"is_public"`
}

// API のレスポンス
type UserProfileResponse struct {
	DisplayName string    `json:"display_name"`
	Avatar      *string   `json:"avatar,omitempty"`
	CoverImage  *string   `json:"cover_image,omitempty"`
	Bio         *string   `json:"bio,omitempty"`
	JobTitle    *string   `json:"job_title,omitempty"`
	Website     *string   `json:"website,omitempty"`
	Location    *string   `json:"location,omitempty"`
	BirthPlace  *string   `json:"birth_place,omitempty"`
	SNSLinks    []SNSLink `json:"sns_links"`
	IsPublic    bool      `json:"is_public"`
}
