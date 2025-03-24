package router

import (
	"backend/internal/handler"
	"backend/internal/repository"
	"backend/internal/service"
	"backend/internal/usecase"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// ルーティング設定
func NewRouter(db *gorm.DB) *gin.Engine {
	r := gin.Default()

	// 依存注入
	userRepo := repository.NewUserRepository(db)
	authService := service.NewAuthService(userRepo)
	authUsecase := usecase.NewAuthUsecase(authService)
	authHandler := handler.NewAuthHandler(authUsecase)

	// ルート定義
	r.POST("/login", authHandler.Login)

	return r
}
