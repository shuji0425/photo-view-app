package router

import (
	handler "backend/internal/handler/public"
	"backend/internal/injector"
)

// 構造体
type PublicHandlers struct {
	PublicPhotoHandler   *handler.PublicPhotoHandler
	PublicProfileHandler *handler.PublicProfileHandler
	PublicTagHandler     *handler.PublicTagHandler
}

func NewPublicHandlers(usecases *injector.Usecases) *PublicHandlers {
	return &PublicHandlers{
		PublicPhotoHandler:   handler.NewPublicPhotoHandler(usecases.PhotoTag, usecases.Photo),
		PublicProfileHandler: handler.NewPublicProfileHandler(usecases.Profile),
		PublicTagHandler:     handler.NewPublicTagHandler(usecases.Tag),
	}
}
