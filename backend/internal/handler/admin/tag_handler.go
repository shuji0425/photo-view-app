package handler

import (
	"backend/internal/converter"
	"backend/internal/dto"
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

// タグを全件取得
func (h *TagHandler) GetAllTags(c *gin.Context) {
	tags, err := h.tagUsecase.GetAllTags(c.Request.Context())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "タグの取得に失敗しました"})
		return
	}
	c.JSON(http.StatusOK, tags)
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

// タグの並び順を更新
func (h *TagHandler) UpdateSortOrders(c *gin.Context) {
	var req []dto.TagSortRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "無効なリクエストです"})
		return
	}

	// DOT -> domain変換
	domainsTags := converter.ToDomainTagSort(req)

	// 更新処理
	if err := h.tagUsecase.UpdateSortOrders(c.Request.Context(), domainsTags); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "更新に失敗しました"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "更新に成功しました"})
}
