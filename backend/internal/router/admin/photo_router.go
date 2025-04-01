package router

import (
	"backend/internal/handler"

	"github.com/gin-gonic/gin"
)

// プロフィール関連のルーター
func SetupPhotoRoutes(r *gin.RouterGroup, photoHandler *handler.PhotoHandler) {
	photoGroup := r.Group("/photos")

	// ルート
	photoGroup.POST("/upload/:user_id", photoHandler.UploadPhotos)
	photoGroup.POST("/bulk-update", photoHandler.BulkUpdatePhotos)
	photoGroup.GET("/ids", photoHandler.GetPhotosByIDs)
	photoGroup.GET("", photoHandler.GetPaginatedPhotos)
	photoGroup.DELETE("", photoHandler.DeletePhotosByIDs)
}
