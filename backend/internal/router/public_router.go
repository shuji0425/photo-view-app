package router

import (
	"backend/internal/handler"

	"github.com/gin-gonic/gin"
)

// 公開関連のルーター
func SetupPublicRoutes(r *gin.Engine, profileHandler *handler.ProfileHandler) {
	// プロフィール
	r.GET("api/profile", profileHandler.GetPublicAdminProfile)
}
