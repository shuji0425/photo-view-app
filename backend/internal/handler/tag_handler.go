package handler

import (
	"backend/internal/usecase"
	"net/http"

	"github.com/gin-gonic/gin"
)

// 構造体
type TagHandler struct {
	tagUsecase usecase.TagUsecase
}

// 依存注入用
func NewTagHandler(tagUsecase usecase.TagUsecase) *TagHandler {
	return &TagHandler{tagUsecase}
}

// クエリからタグの予測候補を取得
func (h *TagHandler) GetSuggestions(c *gin.Context) {
	query := c.Query("query")
	ctx := c.Request.Context()

	// queryがない時は空の配列を返す
	if query == "" {
		c.JSON(http.StatusOK, []string{})
		return
	}

	// タグ候補取得
	suggestions, err := h.tagUsecase.GetSuggestions(ctx, query)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "タグ候補の取得に失敗しました"})
		return
	}

	// 返却
	c.JSON(http.StatusOK, suggestions)
}
