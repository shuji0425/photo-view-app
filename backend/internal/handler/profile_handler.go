package handler

import (
	"backend/internal/dto"
	"backend/internal/usecase"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// 構造体
type ProfileHandler struct {
	profileUsecase usecase.ProfileUsecase
}

// 依存注入用
func NewProfileHandler(profileUsecase usecase.ProfileUsecase) *ProfileHandler {
	return &ProfileHandler{profileUsecase}
}

// ユーザープロフィールの取得
func (h *ProfileHandler) GetProfileHandler(c *gin.Context) {
	// ユーザーIDを取得
	userID, err := strconv.ParseInt(c.Param("user_id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ユーザーIDを取得できませんでした"})
		return
	}

	profile, err := h.profileUsecase.GetUserProfile(userID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, profile)
}

// プロフィールの作成
func (h *ProfileHandler) CreateProfileHandler(c *gin.Context) {
	userID, err := strconv.ParseInt(c.Param("user_id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ユーザーIDを取得できませんでした"})
		return
	}

	// チェック
	var req dto.CreateProfileRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "正しい形で送信してください"})
		return
	}

	// プロフィールを登録
	profile, err := h.profileUsecase.CreateUserProfile(userID, &req)
	if err != nil {
		c.JSON(http.StatusConflict, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, profile)
}

// プロフィールの更新
func (h *ProfileHandler) UpdateProfileHandler(c *gin.Context) {
	userID, err := strconv.ParseInt(c.Param("user_id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ユーザーIDを取得できませんでした"})
		return
	}

	var req dto.UpdateProfileRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "正しい形で送信してください"})
		return
	}

	// 更新
	profile, err := h.profileUsecase.UpdateUserProfile(userID, &req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, profile)
}
