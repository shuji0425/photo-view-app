package router

import (
	"backend/internal/handler"

	"github.com/gin-gonic/gin"
)

// メタデータポリシー関連のルーター
func SetupMetadataPolicyRoutes(r *gin.RouterGroup, h *handler.MetadataPolicyHandler) {
	policyGroup := r.Group("/metadata-policy")

	policyGroup.GET("", h.Get)
	policyGroup.PATCH("", h.CreateOrUpdate)

}
