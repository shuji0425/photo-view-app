package router

import (
	handler "backend/internal/handler/admin"

	"github.com/gin-gonic/gin"
)

// プロフィール関連のルーター
func SetupProfileRoutes(r *gin.RouterGroup, profileHandler *handler.ProfileHandler) {
	profileGroup := r.Group("/profiles")

	// ルート
	profileGroup.GET("/:user_id", profileHandler.GetProfileHandler)
	profileGroup.POST("/:user_id", profileHandler.CreateProfileHandler)
	profileGroup.PUT("/:user_id", profileHandler.UpdateProfileHandler)
}
