package jwt

import (
	"errors"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

// JWTのシークレットキー
var jwtSecret = []byte(os.Getenv("JSW_SECRET"))

// 有効期限
var tokenExpiry = time.Hour * 24

// JWTに埋め込むクレーム構造体（ペイロード)
type CustomClaims struct {
	UserID   string `json:"user_id"`
	Email    string `json:"email"`
	Username string `json:"username"`
	Role     string `json:"role"`
	jwt.RegisteredClaims
}

// ユーザー情報からトークンを発行
func GenerateToken(userID, email, username, role string) (string, error) {
	claims := CustomClaims{
		UserID:   userID,
		Email:    email,
		Username: username,
		Role:     role,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(tokenExpiry)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtSecret)
}

// トークン文字を検証しクレームを返す
func ParseToken(tokenStr string) (*CustomClaims, error) {
	token, err := jwt.ParseWithClaims(tokenStr, &CustomClaims{}, func(token *jwt.Token) (any, error) {
		return jwtSecret, nil
	})

	if err != nil {
		return nil, err
	}

	if clamis, ok := token.Claims.(*CustomClaims); ok && token.Valid {
		return clamis, nil
	}

	return nil, errors.New("トークンが無効です")
}
