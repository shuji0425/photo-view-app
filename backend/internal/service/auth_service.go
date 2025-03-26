package service

import (
	"backend/internal/repository"
	"backend/pkg/hash"
	"backend/pkg/jwt"
	"errors"
)

// 認証サービスのインターフェース
type AuthService interface {
	Login(email, password string) (string, error)
}

// 認証サービス構造体
type authService struct {
	userRepo repository.UserRepository
}

// 認証サービスのコンストラクタ
func NewAuthService(userRepo repository.UserRepository) AuthService {
	return &authService{userRepo}
}

// ログイン処理
func (s *authService) Login(email, password string) (string, error) {
	// ユーザーをメールアドレスで取得
	user, err := s.userRepo.FindByEmail(email)
	if err != nil {
		return "", errors.New("ユーザーが見つかりません")
	}

	// パスワード照合（bcrypt）
	if err := hash.CompareHashAndPassword(user.Password, password); err != nil {
		return "", errors.New("パスワードが一致しません")
	}

	// JWTトークン発行
	token, err := jwt.GenerateToken(user.ID, user.Email, user.Username, user.Role)
	if err != nil {
		return "", errors.New("JWTの発行に失敗しました")
	}

	return token, nil
}
