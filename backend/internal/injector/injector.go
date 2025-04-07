package injector

import (
	handler "backend/internal/handler/admin"

	"gorm.io/gorm"
)

// 構造体
type InjectedHandlers struct {
	ProfileHandler        *handler.ProfileHandler
	AuthHandler           *handler.AuthHandler
	UserHandler           *handler.UserHandler
	AvatarHandler         *handler.AvatarHandler
	PhotoHandler          *handler.PhotoHandler
	CategoryHandler       *handler.CategoryHandler
	TagHandler            *handler.TagHandler
	PhotoTagHandler       *handler.PhotoTagHandler
	MetadataPolicyHandler *handler.MetadataPolicyHandler
}

func InjectAll(db *gorm.DB) *InjectedHandlers {
	return &InjectedHandlers{
		ProfileHandler:        InjectProfileHandler(db),
		UserHandler:           InjectUserHandler(db),
		AuthHandler:           InjectAuthHandler(db),
		AvatarHandler:         InjectAvatarHandler(db),
		PhotoHandler:          InjectPhotoHandler(db),
		CategoryHandler:       InjectCategoryHandler(db),
		TagHandler:            InjectTagHandler(db),
		PhotoTagHandler:       InjectPhotoTagHandler(db),
		MetadataPolicyHandler: InjectMetadataPolicyHandler(db),
	}
}
