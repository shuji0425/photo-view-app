package repository

import (
	"backend/internal/converter"
	"backend/internal/domain"
	"backend/internal/model"
	"errors"

	"gorm.io/gorm"
)

// ユーザーレポジトリーインターフェース
type UserRepository interface {
	FindByEmail(email string) (*domain.User, error)
	FindByID(userID int64) (*domain.User, error)
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
