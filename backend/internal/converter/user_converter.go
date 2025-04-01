package converter

import (
	"backend/internal/domain"
	"backend/internal/dto"
	"backend/internal/model"
)

// model -> domain
func ToUserDomain(m *model.User) *domain.User {
	return &domain.User{
		ID:       m.ID,
		Email:    m.Email,
		Username: m.Username,
		Password: m.Password,
		Role:     m.Role,
	}
}

// domain.User を dto.Userに変換
func ConvertToUserResponse(user *domain.User) *dto.UserResponse {
	return &dto.UserResponse{
		ID:       user.ID,
		Email:    user.Email,
		Username: user.Username,
		Role:     user.Role,
	}
}
