package handler

import (
	"backend/internal/usecase"
	"net/http"

	"github.com/gin-gonic/gin"
)

// 認証ハンドラー構造体
type AuthHandler struct {
	usecase usecase.AuthUsecase
}

// 初期化
func NewAuthHandler(usecase usecase.AuthUsecase) *AuthHandler {
	return &AuthHandler{usecase: usecase}
}

// ログインリクエスト用の入力データ構造
type LoginRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=6"`
}

// フロントから情報を受け取りJWTをCookieに返す
func (h *AuthHandler) Login(c *gin.Context) {
	var req LoginRequest

	// JSONを構造体にバインド（バリデーションも行う）
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "入力内容が正しくありません"})
		return
	}

	// ユースケース層のLoginを実行
	token, err := h.usecase.Login(req.Email, req.Password)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}

	// JWTをCookieにセット（HttpOnlyでセキュア）
	c.SetCookie(
		"access_token", // Cookie名
		token,          // JWT
		86400,          // 有効期限（秒）24時間
		"/",            // パス
		"",             // ドメイン（空でもOK）
		false,          // trueだとhttpsのみ
		true,           // HttpOnly(Jsからアクセス不可)
	)

	// レスポンス
	c.JSON(http.StatusOK, gin.H{"message": "ログインに成功しました"})
}
