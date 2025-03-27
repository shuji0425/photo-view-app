package router

import (
	"backend/internal/handler"
	"backend/internal/middleware"

	"github.com/gin-gonic/gin"
)

// ユーザー関連のルート
func SetupUserRoutes(r *gin.Engine, userHandler *handler.UserHandler) {
	r.Use(middleware.AuthMiddleware())
	r.GET("/me", userHandler.GetMe)
}
