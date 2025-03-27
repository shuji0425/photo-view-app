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
	// プロフィール
	profileRepo := repository.NewProfileRepository(db)
	imageSaver := infrastructure.NewImageSaver("../frontend/public/images")
	profileService := service.NewProfileService(profileRepo, imageSaver)
	profileUsecase := usecase.NewProfileUsecase(profileService)
	return handler.NewProfileHandler(profileUsecase)
}
