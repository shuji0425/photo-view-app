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
	photo *handler.PublicPhotoHandler,
) {
	// プロフィール
	r.GET("/profile", profile.GetPublicAdminProfile)

	tagGroup := r.Group("/tags")
	// メイン画面
	tagGroup.GET("/default", tag.GetDefaultTag)
	tagGroup.GET("/with-photos", tag.GetTagsWithPhotos)
	tagGroup.GET("/:tag_id/photos", photo.GetPhotosByTag)

	// 写真
	photoGroup := r.Group("/photos")
	photoGroup.GET("/:photo_id", photo.GetPhotoDetail)
	photoGroup.GET("/ids", photo.GetPublicPhotoIDs)
}
