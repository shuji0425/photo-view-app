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
	// 画像
	imageSaver := infrastructure.NewImageSaver("../frontend/public")
	imageService := service.NewImageService(imageSaver)

	// アバター
	profileRepo := repository.NewProfileRepository(db)
	profileService := service.NewProfileService(profileRepo)
	profileUsecase := usecase.NewProfileUsecase(profileService, imageService)
	return handler.NewAvatarHandler(profileUsecase)
}
