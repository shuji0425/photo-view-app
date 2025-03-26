package injector

import (
	"backend/internal/handler"
	"backend/internal/repository"
	"backend/internal/service"
	"backend/internal/usecase"

	"gorm.io/gorm"
)

// プロフィールの依存関係
func InjectProfileHandler(db *gorm.DB) *handler.ProfileHandler {
	// プロフィール
	profileRepo := repository.NewProfileRepository(db)
	profileService := service.NewProfileService(profileRepo)
	profileUsecase := usecase.NewProfileUsecase(profileService)
	return handler.NewProfileHandler(profileUsecase)
}
