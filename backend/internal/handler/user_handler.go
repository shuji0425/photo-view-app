package handler

import (
	"backend/internal/usecase"
	"net/http"

	"github.com/gin-gonic/gin"
)

// ユーザーハンドラー構造体
type UserHandler struct {
	usecase usecase.UserUsecase
}

// 依存注入用
func NewUserHandler(usecase usecase.UserUsecase) *UserHandler {
	return &UserHandler{usecase: usecase}
}

// ログイン中のユーザー情報を取得
func (h *UserHandler) GetMe(c *gin.Context) {
	userIDRaw, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "ユーザーIDが見つかりません"})
		return
	}

	userID := userIDRaw.(int64)

	// ユースケースからユーザーを取得
	userDTO, err := h.usecase.GetMe(userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// 安全な形式で返却
	c.JSON(http.StatusOK, userDTO)
}
