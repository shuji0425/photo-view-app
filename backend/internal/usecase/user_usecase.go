package usecase

import (
	"backend/internal/dto"
	"backend/internal/service"
)

// ユースケースインターフェース
type UserUsecase interface {
	GetMe(userID int64) (*dto.UserResponse, error)
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
	return ConvertToUserResponse(user), nil
}
