package handler

import (
	"backend/internal/converter"
	"backend/internal/dto"
	"backend/internal/usecase"
	"net/http"

	"github.com/gin-gonic/gin"
)

// 構造体
type MetadataPolicyHandler struct {
	metadataPolicyUsecase usecase.MetadataPolicyUsecase
}

// 依存注入用
func NewMetadataPolicyHandler(metadataPolicyUsecase usecase.MetadataPolicyUsecase) *MetadataPolicyHandler {
	return &MetadataPolicyHandler{metadataPolicyUsecase}
}

// 表示ポリシーを取得
func (h *MetadataPolicyHandler) Get(c *gin.Context) {
	userIDRaw, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "ユーザーIDが見つかりません"})
		return
	}

	userID, ok := userIDRaw.(int64)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "ユーザーIDの型が不正です"})
		return
	}

	policy, err := h.metadataPolicyUsecase.GetByUserID(c.Request.Context(), userID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "表示ポリシーが見つかりませんでした"})
		return
	}

	c.JSON(http.StatusOK, policy)
}

// 表示ポリシーを作成or更新
func (h *MetadataPolicyHandler) CreateOrUpdate(c *gin.Context) {
	userIDRaw, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "ユーザーIDが見つかりません"})
	}

	userID, ok := userIDRaw.(int64)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "ユーザーIDの型が不正です"})
		return
	}

	var req dto.MetadataPolicyDTO
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "無効なリクエストです"})
		return
	}

	// 作成or更新処理
	domainPolicy := converter.ToDomainFromMetadataPolicyDTO(&req, userID)
	if err := h.metadataPolicyUsecase.CreateOrUpdate(c.Request.Context(), domainPolicy); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "保存に失敗しました"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "保存しました"})
}
