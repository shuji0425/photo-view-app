package router

import (
	"backend/internal/handler"
	"backend/internal/middleware"

	"github.com/gin-gonic/gin"
)

// プロフィール関連のルーター
func SetupProfileRoutes(r *gin.Engine, profileHandler *handler.ProfileHandler) {
	profileGroup := r.Group("/profiles")
	profileGroup.Use(middleware.AuthMiddleware())

	// ルート
	profileGroup.GET("/:user_id", profileHandler.GetProfileHandler)
	profileGroup.POST("/:user_id", profileHandler.CreateProfileHandler)
	profileGroup.PUT("/:user_id", profileHandler.UpdateProfileHandler)
}
