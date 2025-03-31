package router

import (
	"backend/internal/handler"
	"backend/internal/middleware"

	"github.com/gin-gonic/gin"
)

// プロフィール関連のルーター
func SetupPhotoRoutes(r *gin.Engine, photoHandler *handler.PhotoHandler) {
	photoGroup := r.Group("/photos")
	photoGroup.Use(middleware.AuthMiddleware())

	// ルート
	photoGroup.POST("/upload/:user_id", photoHandler.UploadPhotos)
	photoGroup.GET("/ids", photoHandler.GetPhotosByIDs)
	photoGroup.GET("/", photoHandler.GetPaginatedPhotos)
	photoGroup.DELETE("/", photoHandler.DeletePhotosByIDs)
}
