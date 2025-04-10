package router

import (
	handler "backend/internal/handler/admin"
	"backend/internal/injector"
)

type AdminHandlers struct {
	AuthHandler           *handler.AuthHandler
	AvatarHandler         *handler.AvatarHandler
	CategoryHandler       *handler.CategoryHandler
	MetadataPolicyHandler *handler.MetadataPolicyHandler
	PhotoHandler          *handler.PhotoHandler
	PhotoTagHandler       *handler.PhotoTagHandler
	ProfileHandler        *handler.ProfileHandler
	TagHandler            *handler.TagHandler
	UserHandler           *handler.UserHandler
}

func NewAdminHandlers(usecases *injector.Usecases) *AdminHandlers {
	return &AdminHandlers{
		AuthHandler:           handler.NewAuthHandler(usecases.Auth),
		AvatarHandler:         handler.NewAvatarHandler(usecases.Profile),
		CategoryHandler:       handler.NewCategoryHandler(usecases.Category),
		MetadataPolicyHandler: handler.NewMetadataPolicyHandler(usecases.MetadataPolicy),
		PhotoHandler:          handler.NewPhotoHandler(usecases.Photo),
		PhotoTagHandler:       handler.NewPhotoTagHandler(usecases.PhotoTag),
		ProfileHandler:        handler.NewProfileHandler(usecases.Profile),
		TagHandler:            handler.NewTagHandler(usecases.Tag),
		UserHandler:           handler.NewUserHandler(usecases.User),
	}
}
