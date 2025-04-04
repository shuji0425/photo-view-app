package router

import (
	"backend/internal/handler"

	"github.com/gin-gonic/gin"
)

// ユーザー関連のルート
func SetupUserRoutes(r *gin.RouterGroup, userHandler *handler.UserHandler) {
	r.GET("/me", userHandler.GetMe)
}
