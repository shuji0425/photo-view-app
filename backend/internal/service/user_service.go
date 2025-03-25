package service

import (
	"backend/internal/domain"
	"backend/internal/repository"
)

// レポジトリ層のインターフェース
type UserRepository interface {
	FindByID(userID int64) (*domain.User, error)
}

// ビジネスロジック層のインターフェース
type UserService interface {
	GetUserByID(userID int64) (*domain.User, error)
}

// 実装構造体 レポジトリーに依存
type userService struct {
	userRepo repository.UserRepository
}

// 依存注入用コンストラクタ
func NewUserService(userRepo repository.UserRepository) UserService {
	return &userService{userRepo}
}

// IDでユーザー情報を取得
func (s *userService) GetUserByID(userID int64) (*domain.User, error) {
	return s.userRepo.FindByID(userID)
}
