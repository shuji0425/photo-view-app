package router

import (
	handler "backend/internal/handler/admin"

	"github.com/gin-gonic/gin"
)

// ユーザー関連のルート
func SetupUserRoutes(r *gin.RouterGroup, userHandler *handler.UserHandler) {
	r.GET("/me", userHandler.GetMe)
	r.PATCH("/me/basic", userHandler.UpdateBasicInfo)
	r.PATCH("/me/password", userHandler.UpdatePassword)
}
