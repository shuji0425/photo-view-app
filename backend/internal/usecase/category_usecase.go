package usecase

import (
	"backend/internal/converter"
	"backend/internal/dto"
	"backend/internal/service"
)

// インターフェース
type CategoryUsecase interface {
	GetAllCategories() ([]dto.CategoryDTO, error)
}

// 構造体
type categoryUsecase struct {
	categoryService service.CategoryService
}

// 依存注入用
func NewCategoryUsecase(categoryService service.CategoryService) CategoryUsecase {
	return &categoryUsecase{categoryService}
}

// カテゴリー一覧を取得
func (u *categoryUsecase) GetAllCategories() ([]dto.CategoryDTO, error) {
	categories, err := u.categoryService.GetAll()
	if err != nil {
		return nil, err
	}

	return converter.ConvertToCategoryResponse(categories), nil
}
