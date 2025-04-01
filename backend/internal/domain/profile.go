package domain

import (
	"time"
)

// プロフィール（DBモデル）
type Profile struct {
	UserID      int64
	DisplayName string
	Avatar      *string
	CoverImage  *string
	Bio         *string
	JobTitle    *string
	Website     *string
	Location    *string
	BirthPlace  *string
	SNSLinks    SNSLinks
	IsPublic    bool
	CreatedAt   time.Time
	UpdatedAt   time.Time
}
