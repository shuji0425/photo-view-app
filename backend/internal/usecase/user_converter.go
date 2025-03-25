package usecase

import (
	"backend/internal/domain"
	"backend/internal/dto"
)

// domain.User を dto.Userに変換
func ConvertToUserResponse(user *domain.User) *dto.UserResponse {
	return &dto.UserResponse{
		ID:       user.ID,
		Email:    user.Email,
		Username: user.Username,
		Role:     user.Role,
	}
}
