package service

import (
	"backend/internal/domain"
	"backend/internal/repository"
)

// インターフェース
type CategoryService interface {
	GetAll() ([]*domain.Category, error)
}

// 構造体
type categoryService struct {
	categoryRepo repository.CategoryRepository
}

// 依存注入用
func NewCategoryService(categoryRepo repository.CategoryRepository) CategoryService {
	return &categoryService{categoryRepo}
}

// カテゴリー一覧を取得
func (s *categoryService) GetAll() ([]*domain.Category, error) {
	return s.categoryRepo.FindAll()
}
