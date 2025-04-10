package injector

import (
	"backend/internal/repository"
	"backend/internal/service"
	"backend/internal/usecase"

	"gorm.io/gorm"
)

func InjectAuthUsecase(db *gorm.DB) usecase.AuthUsecase {
	// ユーザー
	userRepo := repository.NewUserRepository(db)
	// 認証
	authService := service.NewAuthService(userRepo)
	return usecase.NewAuthUsecase(authService)
}
