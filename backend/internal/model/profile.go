package model

import (
	"backend/internal/domain"
	"time"
)

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
	SNSLinks    domain.SNSLinks `gorm:"type:json"` // domain をそのまま利用
	IsPublic    bool            `gorm:"default:true"`
	CreatedAt   time.Time
	UpdatedAt   time.Time
}
