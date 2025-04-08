package injector

import (
	handler "backend/internal/handler/public"

	"gorm.io/gorm"
)

// 構造体
type PublicInjectedHandlers struct {
	PublicProfileHandler *handler.PublicProfileHandler
	PublicTagHandler     *handler.PublicTagHandler
	PublicPhotoHandler   *handler.PublicPhotoHandler
}

func PublicInjectAll(db *gorm.DB) *PublicInjectedHandlers {
	return &PublicInjectedHandlers{
		PublicProfileHandler: InjectPublicProfileHandler(db),
		PublicTagHandler:     InjectPublicTagHandler(db),
		PublicPhotoHandler:   InjectPublicPhotoHandler(db),
	}
}
