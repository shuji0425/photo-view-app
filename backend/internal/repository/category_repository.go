package repository

import (
	"backend/internal/domain"

	"gorm.io/gorm"
)

// インターフェース
type CategoryRepository interface {
	FindAll() ([]*domain.Category, error)
}

// 構造体
type categoryRepository struct {
	db *gorm.DB
}

// 依存注入用
func NewCategoryRepository(db *gorm.DB) CategoryRepository {
	return &categoryRepository{db}
}

// カテゴリーを全件取得（並び順の昇順）
func (r *categoryRepository) FindAll() ([]*domain.Category, error) {
	var categories []*domain.Category
	if err := r.db.Order("sort_order ASC").Find(&categories).Error; err != nil {
		return nil, err
	}

	return categories, nil
}
