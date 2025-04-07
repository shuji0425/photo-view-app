package repository

import (
	"backend/internal/converter"
	"backend/internal/domain"
	"backend/internal/model"
	"context"
	"errors"

	"gorm.io/gorm"
)

// ユーザーレポジトリーインターフェース
type UserRepository interface {
	FindByEmail(email string) (*domain.User, error)
	FindByID(userID int64) (*domain.User, error)
	UpdateBasicInfo(ctx context.Context, user *domain.User) error
	UpdatePassword(ctx context.Context, userID int64, hashedPassword string) error
}

// GORMを使ったユーザーレポジトリーの実装構造体
type userRepository struct {
	db *gorm.DB
}

// ユーザーレポジトリーのコンストラクタ
func NewUserRepository(db *gorm.DB) UserRepository {
	return &userRepository{db}
}

// Emailからユーザーを1件取得する
func (r *userRepository) FindByEmail(email string) (*domain.User, error) {
	var user model.User

	// 確認
	if err := r.db.Where("email = ?", email).First(&user).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("ユーザーが見つかりません")
		}
		return nil, err
	}
	return converter.ToDomainUser(&user), nil
}

// IDからユーザーを取得
func (r *userRepository) FindByID(userID int64) (*domain.User, error) {
	var user model.User
	if err := r.db.First(&user, userID).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("ユーザーが見つかりません")
		}
		return nil, err
	}
	return converter.ToDomainUser(&user), nil
}

// ユーザー名とメールアドレスを更新
func (r *userRepository) UpdateBasicInfo(ctx context.Context, user *domain.User) error {
	modelUser := converter.ToModelUser(user)
	return r.db.WithContext(ctx).
		Model(modelUser).
		Where("id = ?", modelUser.ID).
		Updates(map[string]interface{}{
			"username": modelUser.Username,
			"email":    modelUser.Email,
		}).Error
}

// パスワードを更新
func (r *userRepository) UpdatePassword(ctx context.Context, userID int64, hashedPassword string) error {
	return r.db.WithContext(ctx).
		Model(&model.User{}).
		Where("id = ?", userID).
		Update("password_hash", hashedPassword).
		Error
}
