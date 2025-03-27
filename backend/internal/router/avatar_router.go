package router

import (
	"backend/internal/handler"

	"github.com/gin-gonic/gin"
)

// アバター関連のルーター
func SetupAvatarRoutes(r *gin.Engine, h *handler.AvatarHandler) {
	r.POST("/profiles/avatar/:user_id", h.UploadAvatar)
}
