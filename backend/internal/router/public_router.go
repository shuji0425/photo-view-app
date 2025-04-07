package router

import (
	handler "backend/internal/handler/public"

	"github.com/gin-gonic/gin"
)

// 公開関連のルーター
func SetupPublicRoutes(r *gin.RouterGroup, publicProfileHandler *handler.PublicProfileHandler) {
	// プロフィール
	r.GET("/profile", publicProfileHandler.GetPublicAdminProfile)
}
