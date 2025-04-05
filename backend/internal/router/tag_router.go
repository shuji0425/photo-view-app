package router

import (
	"backend/internal/handler"

	"github.com/gin-gonic/gin"
)

// タグ関連のルート
func SetupTagRoutes(r *gin.RouterGroup, h *handler.TagHandler, pth *handler.PhotoTagHandler) {
	tagGroup := r.Group("/tags")

	tagGroup.GET("", h.GetSuggestions)
	tagGroup.GET("/all", h.GetAllTags)
	tagGroup.GET("/:tag_id/photos", pth.GetPhotosByTagID)
	tagGroup.PUT("/:tag_id/photos/sort", pth.UpdateSortOrders)
	tagGroup.PUT("/sort", h.UpdateSortOrders)
}
