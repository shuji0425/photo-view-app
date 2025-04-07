package usecase

import (
	"backend/internal/converter"
	"backend/internal/domain"
	"backend/internal/dto"
	"backend/internal/service"
	"context"
	"errors"
)

// ユースケースインターフェース
type UserUsecase interface {
	GetMe(userID int64) (*dto.UserResponse, error)
	UpdateBasicInfo(ctx context.Context, user *domain.User, currentPassword string) (*dto.UserResponse, error)
	UpdatePassword(ctx context.Context, userID int64, password *domain.PasswordUpdate) error
}

type userUsecase struct {
	userService service.UserService
}

// 依存注入用
func NewUserUsecase(service service.UserService) UserUsecase {
	return &userUsecase{userService: service}
}

// ユーザー情報を取得
func (u *userUsecase) GetMe(userID int64) (*dto.UserResponse, error) {
	user, err := u.userService.GetUserByID(userID)
	if err != nil {
		return nil, err
	}
	return converter.ConvertToUserResponse(user), nil
}

// ユーザー情報更新
func (u *userUsecase) UpdateBasicInfo(ctx context.Context, user *domain.User, currentPassword string) (*dto.UserResponse, error) {
	// 更新処理
	updatedUser, err := u.userService.UpdateBasicInfo(ctx, user, currentPassword)
	if err != nil {
		return nil, err
	}
	// dtoに変換して返却
	return converter.ConvertToUserResponse(updatedUser), nil
}

// パスワード更新
func (u *userUsecase) UpdatePassword(ctx context.Context, userID int64, password *domain.PasswordUpdate) error {
	// 一致チェック
	if password.NewPassword != password.ConfirmNewPassword {
		return errors.New("新しいパスワードが一致しません")
	}

	return u.userService.UpdatePassword(ctx, userID, password.CurrentPassword, password.NewPassword)
}
