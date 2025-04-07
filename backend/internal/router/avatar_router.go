package router

import (
	handler "backend/internal/handler/admin"

	"github.com/gin-gonic/gin"
)

// アバター関連のルーター
func SetupAvatarRoutes(r *gin.RouterGroup, h *handler.AvatarHandler) {
	r.POST("/profiles/avatar/:user_id", h.UploadAvatar)
}
