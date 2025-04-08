package handler

import (
	"backend/internal/usecase"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// 構造体
type PublicPhotoHandler struct {
	photoTagUsecase usecase.PhotoTagUsecase
}

// 依存注入用
func NewPublicPhotoHandler(photoTagUsecase usecase.PhotoTagUsecase) *PublicPhotoHandler {
	return &PublicPhotoHandler{photoTagUsecase}
}

// デフォルトタグを1件取得
func (h *PublicPhotoHandler) GetPhotosByTag(c *gin.Context) {
	tagIDStr := c.Param("tag_id")
	tagID, err := strconv.ParseInt(tagIDStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "不正なタグIDです"})
		return
	}

	photos, err := h.photoTagUsecase.GetPhotosByTagIDForPublic(c.Request.Context(), tagID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "取得に失敗しました"})
		return
	}

	c.JSON(http.StatusOK, photos)
}
