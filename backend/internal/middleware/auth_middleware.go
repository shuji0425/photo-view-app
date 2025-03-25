package middleware

import (
	"backend/pkg/jwt"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

// JWTトークンを検証しユーザーIDをコンテキストにセット
func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		token, err := c.Cookie("access_token")

		// トークンが空ならエラー
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "トークンが見つかりません"})
			return
		}

		// JWT検証
		claims, err := jwt.ParseToken(token)
		if err != nil {
			fmt.Println("token", err)
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "トークンが無効です"})
			return
		}

		// userIDをコンテキストに格納
		c.Set("userID", claims.UserID)
		c.Next()
	}
}
