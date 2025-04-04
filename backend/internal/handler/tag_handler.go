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
	suggestions := h.tagUsecase.GetSuggestions(query)

	// 返却
	c.JSON(http.StatusOK, suggestions)
}
