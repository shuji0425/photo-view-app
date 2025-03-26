package injector

import (
	"backend/internal/handler"

	"gorm.io/gorm"
)

// 構造体
type InjectedHandlers struct {
	ProfileHandler *handler.ProfileHandler
	AuthHandler    *handler.AuthHandler
	UserHandler    *handler.UserHandler
}

func InjectAll(db *gorm.DB) *InjectedHandlers {
	return &InjectedHandlers{
		ProfileHandler: InjectProfileHandler(db),
		UserHandler:    InjectUserHandler(db),
		AuthHandler:    InjectAuthHandler(db),
	}
}
