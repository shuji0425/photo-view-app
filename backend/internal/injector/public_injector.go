package injector

import (
	handler "backend/internal/handler/public"

	"gorm.io/gorm"
)

// 構造体
type PublicInjectedHandlers struct {
	PublicProfileHandler *handler.PublicProfileHandler
}

func PublicInjectAll(db *gorm.DB) *PublicInjectedHandlers {
	return &PublicInjectedHandlers{
		PublicProfileHandler: InjectPublicProfileHandler(db),
	}
}
