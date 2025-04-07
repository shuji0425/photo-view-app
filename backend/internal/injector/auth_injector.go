package injector

import (
	handler "backend/internal/handler/admin"
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
