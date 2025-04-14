package handler

import (
	"backend/internal/middleware"
	"backend/internal/usecase"
	"net/http"

	"github.com/gin-gonic/gin"
)

// 構造体
type PublicProfileHandler struct {
	profileUsecase usecase.ProfileUsecase
}

// 依存注入用
func NewPublicProfileHandler(profileUsecase usecase.ProfileUsecase) *PublicProfileHandler {
	return &PublicProfileHandler{profileUsecase}
}

// 公開プロフィールを返す
func (h *PublicProfileHandler) GetPublicAdminProfile(c *gin.Context) {
	profile, err := h.profileUsecase.GetPublicAdminProfile()
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	// キャッシュ
	middleware.SetCache(c, 300)

	c.JSON(http.StatusOK, profile)
}
