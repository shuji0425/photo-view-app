package handler

import (
	"backend/internal/usecase"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// 構造体
type AvatarHandler struct {
	profileUsecase usecase.ProfileUsecase
}

// 依存注入
func NewAvatarHandler(profileUsecase usecase.ProfileUsecase) *AvatarHandler {
	return &AvatarHandler{profileUsecase}
}

// アバター画像登録
func (h *AvatarHandler) UploadAvatar(c *gin.Context) {
	// ファイル取得
	file, err := c.FormFile("file")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "ファイルが必要です"})
		return
	}

	// ユーザーID取得
	userID, err := strconv.ParseInt(c.Param("user_id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ユーザーIDを取得できませんでした"})
		return
	}

	// アップロード
	url, err := h.profileUsecase.UploadAvatar(userID, file)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "アップロード失敗"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"url": url})
}
