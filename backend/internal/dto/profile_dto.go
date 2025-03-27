package dto

// 新規プロフィール作成のリクエスト
type CreateProfileRequest struct {
	Avatar   *string `json:"avatar"`
	Bio      *string `json:"bio"`
	Website  *string `json:"website"`
	Location *string `json:"location"`
}

// プロフィール更新のリクエスト
type UpdateProfileRequest struct {
	Avatar   *string `json:"avatar"`
	Bio      *string `json:"bio"`
	Website  *string `json:"website"`
	Location *string `json:"location"`
}

// API のレスポンス
type UserProfileResponse struct {
	UserID   int64   `json:"user_id"`
	Avatar   *string `json:"avatar"`
	Bio      *string `json:"bio"`
	Website  *string `json:"website"`
	Location *string `json:"location"`
}
