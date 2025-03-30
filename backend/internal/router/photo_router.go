package router

import (
	"backend/internal/handler"
	"backend/internal/middleware"

	"github.com/gin-gonic/gin"
)

// プロフィール関連のルーター
func SetupPhotoRoutes(r *gin.Engine, photoHandler *handler.PhotoHandler) {
	adminGroup := r.Group("/photos")
	adminGroup.Use(middleware.AuthMiddleware())

	// ルート
	adminGroup.POST("/upload/:user_id", photoHandler.UploadPhotos)
	adminGroup.GET("/ids", photoHandler.GetPhotosByIDs)
}
