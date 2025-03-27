package injector

import (
	"backend/internal/handler"
	"backend/internal/infrastructure"
	"backend/internal/repository"
	"backend/internal/service"
	"backend/internal/usecase"

	"gorm.io/gorm"
)

func InjectAvatarHandler(db *gorm.DB) *handler.AvatarHandler {
	// アバター
	profileRepo := repository.NewProfileRepository(db)
	imageSaver := infrastructure.NewImageSaver("../frontend/public/images")
	profileService := service.NewProfileService(profileRepo, imageSaver)
	profileUsecase := usecase.NewProfileUsecase(profileService)
	return handler.NewAvatarHandler(profileUsecase)
}
