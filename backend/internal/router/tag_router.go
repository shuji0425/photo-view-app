package router

import (
	"backend/internal/handler"

	"github.com/gin-gonic/gin"
)

// タグ関連のルート
func SetupTagRoutes(r *gin.RouterGroup, h *handler.TagHandler) {
	tagGroup := r.Group("/tags")

	tagGroup.GET("", h.GetSuggestions)
	tagGroup.GET("/all", h.GetAllTags)
	tagGroup.PUT("/sort", h.UpdateSortOrders)
}
