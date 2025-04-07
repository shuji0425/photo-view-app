package router

import (
	handler "backend/internal/handler/admin"

	"github.com/gin-gonic/gin"
)

// カテゴリ関連のルーター
func SetupCategoryRoutes(r *gin.RouterGroup, categoryHandler *handler.CategoryHandler) {
	categoryGroup := r.Group("/categories")

	categoryGroup.GET("", categoryHandler.GetAllCategories)
}
