package injector

import (
	"backend/internal/handler"
	"backend/internal/repository"
	"backend/internal/service"
	"backend/internal/usecase"

	"gorm.io/gorm"
)

func InjectUserHandler(db *gorm.DB) *handler.UserHandler {
	// ユーザー
	userRepo := repository.NewUserRepository(db)
	userService := service.NewUserService(userRepo)
	userUsecase := usecase.NewUserUsecase(userService)
	return handler.NewUserHandler(userUsecase)
}
