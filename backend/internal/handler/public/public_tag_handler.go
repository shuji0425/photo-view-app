package handler

import (
	"backend/internal/middleware"
	"backend/internal/usecase"
	"net/http"

	"github.com/gin-gonic/gin"
)

// 構造体
type PublicTagHandler struct {
	tagUsecase usecase.TagUsecase
}

// 依存注入用
func NewPublicTagHandler(tagUsecase usecase.TagUsecase) *PublicTagHandler {
	return &PublicTagHandler{tagUsecase}
}

// デフォルトタグを1件取得
func (h *PublicTagHandler) GetDefaultTag(c *gin.Context) {
	tag, err := h.tagUsecase.GetDefaultTag(c.Request.Context())
	if err != nil {
		// タグが絶対にある前提なので、ここには基本来ない想定
		c.JSON(http.StatusOK, gin.H{
			"id":        0,
			"name":      "NoTag",
			"sortOrder": 0,
		})
		return
	}
	// キャッシュ
	middleware.SetCache(c, 300)

	c.JSON(http.StatusOK, tag)
}

// タグ一覧を取得（写真のないタグは除外）
func (h *PublicTagHandler) GetTagsWithPhotos(c *gin.Context) {
	tags, err := h.tagUsecase.GetTagsWithPhotos(c.Request.Context())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "取得に失敗しました"})
		return
	}
	// キャッシュ
	middleware.SetCache(c, 300)

	c.JSON(http.StatusOK, tags)
}
