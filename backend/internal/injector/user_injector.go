package injector

import (
	"backend/internal/repository"
	"backend/internal/service"
	"backend/internal/usecase"

	"gorm.io/gorm"
)

func InjectUserUsecase(db *gorm.DB) usecase.UserUsecase {
	// ユーザー
	userRepo := repository.NewUserRepository(db)
	userService := service.NewUserService(userRepo)
	return usecase.NewUserUsecase(userService)
}
