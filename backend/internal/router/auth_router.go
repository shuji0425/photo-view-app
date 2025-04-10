package router

import (
	handler "backend/internal/handler/admin"

	"github.com/gin-gonic/gin"
)

// 認証関連のルーター
func SetupAuthRoutes(r *gin.RouterGroup, authHandler *handler.AuthHandler) {
	// 認証
	r.POST("/login", authHandler.Login)
	r.POST("/logout", authHandler.Logout)
}
