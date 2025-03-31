package handler

import (
	"backend/internal/usecase"
	"net/http"

	"github.com/gin-gonic/gin"
)

// 構造体
type CategoryHandler struct {
	categoryUsecase usecase.CategoryUsecase
}

// 依存注入用
func NewCategoryHandler(categoryUsecase usecase.CategoryUsecase) *CategoryHandler {
	return &CategoryHandler{categoryUsecase}
}

// カテゴリー一覧を返却
func (h *CategoryHandler) GetAllCategories(c *gin.Context) {
	categories, err := h.categoryUsecase.GetAllCategories()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "カテゴリの取得に失敗しました"})
		return
	}
	c.JSON(http.StatusOK, categories)
}
