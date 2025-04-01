package converter

import (
	"backend/internal/domain"
	"backend/internal/dto"
)

// 返却用に変換
func ConvertToCategoryResponse(categories []*domain.Category) []dto.CategoryDTO {
	var result []dto.CategoryDTO

	// 変換
	for _, category := range categories {
		result = append(result, dto.CategoryDTO{
			ID:        category.ID,
			Name:      category.Name,
			SortOrder: category.SortOrder,
		})
	}
	return result
}
