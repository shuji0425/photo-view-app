package router

import (
	"backend/internal/handler"

	"github.com/gin-gonic/gin"
)

// 公開関連のルーター
func SetupPublicRoutes(r *gin.RouterGroup, publicProfileHandler *handler.PublicProfileHandler) {
	// プロフィール
	r.GET("/profile", publicProfileHandler.GetPublicAdminProfile)
}
