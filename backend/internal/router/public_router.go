package router

import (
	handler "backend/internal/handler/public"

	"github.com/gin-gonic/gin"
)

// 公開関連のルーター
func SetupPublicRoutes(
	r *gin.RouterGroup,
	profile *handler.PublicProfileHandler,
	tag *handler.PublicTagHandler,
) {
	// プロフィール
	r.GET("/profile", profile.GetPublicAdminProfile)

	// メイン画面
	r.GET("/tags/default", tag.GetDefaultTag)
}
