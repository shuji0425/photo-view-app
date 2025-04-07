package service

import (
	"backend/internal/domain"
	"backend/internal/repository"
	"backend/pkg/hash"
	"context"
	"errors"
)

// ビジネスロジック層のインターフェース
type UserService interface {
	GetUserByID(userID int64) (*domain.User, error)
	UpdateBasicInfo(ctx context.Context, input *domain.User, currentPassword string) (*domain.User, error)
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

// パスワード照合と更新
func (s *userService) UpdateBasicInfo(ctx context.Context, input *domain.User, currentPassword string) (*domain.User, error) {
	user, err := s.userRepo.FindByID(input.ID)
	if err != nil {
		return nil, err
	}

	// パスワード照合（bcrypt）
	if err := hash.CompareHashAndPassword(user.Password, currentPassword); err != nil {
		return nil, errors.New("パスワードが一致しません")
	}

	// 更新
	user.Username = input.Username
	user.Email = input.Email
	if err := s.userRepo.UpdateBasicInfo(ctx, user); err != nil {
		return nil, err
	}

	return user, nil
}
