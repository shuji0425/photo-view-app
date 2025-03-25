package router

import (
	"backend/internal/handler"
	"backend/internal/middleware"
	"backend/internal/repository"
	"backend/internal/service"
	"backend/internal/usecase"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// ルーティング設定
func NewRouter(db *gorm.DB) *gin.Engine {
	r := gin.Default()
	r.Use(middleware.CORSMiddleware())
	r.SetTrustedProxies(nil) // プロキシをローカルのみ許可

	// 依存注入
	// ユーザー
	userRepo := repository.NewUserRepository(db)
	userService := service.NewUserService(userRepo)
	userUsecase := usecase.NewUserUsecase(userService)
	userHandler := handler.NewUserHandler(userUsecase)

	// 認証
	authService := service.NewAuthService(userRepo)
	authUsecase := usecase.NewAuthUsecase(authService)
	authHandler := handler.NewAuthHandler(authUsecase)

	// ルート定義
	// 認証が必要
	auth := r.Group("/").Use(middleware.AuthMiddleware())
	{
		auth.GET("/me", userHandler.GetMe)
	}

	r.POST("/login", authHandler.Login)

	return r
}
