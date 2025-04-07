package converter

import (
	"backend/internal/domain"
	"backend/internal/dto"
	"backend/internal/model"
)

// domain.User を dto.Userに変換
func ConvertToUserResponse(user *domain.User) *dto.UserResponse {
	return &dto.UserResponse{
		ID:        user.ID,
		Email:     user.Email,
		Username:  user.Username,
		Role:      user.Role,
		CreatedAt: user.CreatedAt,
		UpdatedAt: user.UpdatedAt,
	}
}

// Model -> Domain
func ToDomainUser(m *model.User) *domain.User {
	if m == nil {
		return nil
	}
	return &domain.User{
		ID:       m.ID,
		Email:    m.Email,
		Username: m.Username,
		Password: m.Password,
		Role:     m.Role,
	}
}

// Domain -> Model
func ToModelUser(d *domain.User) *model.User {
	if d == nil {
		return nil
	}
	return &model.User{
		ID:       d.ID,
		Email:    d.Email,
		Username: d.Username,
		Password: d.Password,
		Role:     d.Role,
	}
}

// ユーザー更新用
func ToUserFormUpdate(dto *dto.UpdateAccountRequest, userID int64) *domain.User {
	return &domain.User{
		ID:       userID,
		Username: dto.Username,
		Email:    dto.Email,
	}
}
