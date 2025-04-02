package repository

import (
	"backend/internal/converter"
	"backend/internal/domain"
	"backend/internal/model"

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
	var modelCategories []*model.Category
	if err := r.db.Order("sort_order ASC").Find(&modelCategories).Error; err != nil {
		return nil, err
	}

	return converter.ToCategoryDomainList(modelCategories), nil
}
