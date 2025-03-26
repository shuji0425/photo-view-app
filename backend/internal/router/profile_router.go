package router

import (
	"backend/internal/handler"
	"backend/internal/middleware"

	"github.com/gin-gonic/gin"
)

// プロフィール関連のルーター
func SetupProfileRoutes(r *gin.Engine, profileHandler *handler.ProfileHandler) {
	adminGroup := r.Group("/admin/profiles")
	adminGroup.Use(middleware.AuthMiddleware())

	// ルート
	adminGroup.GET("/:user_id", profileHandler.GetProfileHandler)
	adminGroup.POST("/:user_id", profileHandler.CreateProfileHandler)
	adminGroup.PUT("/:user_id", profileHandler.UpdateProfileHandler)
}
