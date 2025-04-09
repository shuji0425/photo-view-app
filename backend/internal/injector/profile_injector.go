package injector

import (
	"backend/internal/infrastructure"
	"backend/internal/repository"
	"backend/internal/service"
	"backend/internal/usecase"

	"gorm.io/gorm"
)

// プロフィールの依存関係
func InjectProfileUsecase(db *gorm.DB, imageSaver infrastructure.ImageSaver) usecase.ProfileUsecase {
	imageService := service.NewImageService(imageSaver)

	// プロフィール
	profileRepo := repository.NewProfileRepository(db)
	profileService := service.NewProfileService(profileRepo)
	return usecase.NewProfileUsecase(profileService, imageService)
}
