package domain

import (
	"time"

	"gorm.io/datatypes"
)

// プロフィール（DBモデル）
type Profile struct {
	UserID      int64  `gorm:"primaryKey"`
	DisplayName string `gorm:"not null"`
	Avatar      *string
	CoverImage  *string
	Bio         *string
	JobTitle    *string
	Website     *string
	Location    *string
	BirthPlace  *string
	SNSLinks    datatypes.JSON // JSON型（SNSリンク）
	IsPublic    bool           `gorm:"default:true"`
	CreatedAt   time.Time
	UpdatedAt   time.Time
}
