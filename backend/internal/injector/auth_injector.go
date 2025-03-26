package injector

import (
	"backend/internal/handler"
	"backend/internal/repository"
	"backend/internal/service"
	"backend/internal/usecase"

	"gorm.io/gorm"
)

func InjectAuthHandler(db *gorm.DB) *handler.AuthHandler {
	// ユーザー
	userRepo := repository.NewUserRepository(db)
	// 認証
	authService := service.NewAuthService(userRepo)
	authUsecase := usecase.NewAuthUsecase(authService)
	return handler.NewAuthHandler(authUsecase)
}
