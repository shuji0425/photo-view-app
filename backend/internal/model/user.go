package model

import "time"

type User struct {
	ID                       int64                     `gorm:"primaryKey;column:id"`
	Username                 string                    `gorm:"column:username;not null;unique"`
	Email                    string                    `gorm:"column:email;not null;unique"`
	Password                 string                    `gorm:"column:password_hash;not null"`
	Role                     string                    `gorm:"column:role;default:user"`
	CreatedAt                time.Time                 `gorm:"column:created_at;autoCreateTime"`
	UpdatedAt                time.Time                 `gorm:"column:updated_at;autoUpdateTime"`
	MetadataVisibilityPolicy *MetadataVisibilityPolicy `gorm:"foreignKey:UserID"`
}
