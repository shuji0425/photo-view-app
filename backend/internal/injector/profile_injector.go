package injector

import (
	"backend/internal/handler"
	"backend/internal/infrastructure"
	"backend/internal/repository"
	"backend/internal/service"
	"backend/internal/usecase"

	"gorm.io/gorm"
)

// プロフィールの依存関係
func InjectProfileHandler(db *gorm.DB) *handler.ProfileHandler {
	// 画像
	imageSaver := infrastructure.NewImageSaver("../frontend/public")
	imageService := service.NewImageService(imageSaver)

	// プロフィール
	profileRepo := repository.NewProfileRepository(db)
	profileService := service.NewProfileService(profileRepo)
	profileUsecase := usecase.NewProfileUsecase(profileService, imageService)
	return handler.NewProfileHandler(profileUsecase)
}
