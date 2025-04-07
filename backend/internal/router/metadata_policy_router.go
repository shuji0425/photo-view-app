package router

import (
	handler "backend/internal/handler/admin"

	"github.com/gin-gonic/gin"
)

// メタデータポリシー関連のルーター
func SetupMetadataPolicyRoutes(r *gin.RouterGroup, h *handler.MetadataPolicyHandler) {
	policyGroup := r.Group("/metadata-policy")

	policyGroup.GET("", h.Get)
	policyGroup.PATCH("", h.CreateOrUpdate)

}
