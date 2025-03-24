package usecase

import "backend/internal/service"

// 認証ユースケースのインターフェース
type AuthUsecase interface {
	Login(email, password string) (string, error)
}

// 認証ユースケースの構造体
type authUsecase struct {
	authService service.AuthService
}

// ユースケースのコンストラクタ
func NewAuthUsecase(service service.AuthService) AuthUsecase {
	return &authUsecase{authService: service}
}

// ログイン処理
func (u *authUsecase) Login(email, password string) (string, error) {
	return u.authService.Login(email, password)
}
