package converter

import (
	"backend/internal/domain"
	"backend/internal/dto"
	"backend/internal/model"
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

// model -> domain
func ToCategoryDomain(m *model.Category) *domain.Category {
	if m == nil {
		return nil
	}
	return &domain.Category{
		ID:        m.ID,
		Name:      m.Name,
		SortOrder: m.SortOrder,
		CreatedAt: m.CreatedAt,
		UpdatedAt: m.UpdatedAt,
	}
}

// domain → model
func ToCategoryModel(d *domain.Category) *model.Category {
	if d == nil {
		return nil
	}
	return &model.Category{
		ID:        d.ID,
		Name:      d.Name,
		SortOrder: d.SortOrder,
		CreatedAt: d.CreatedAt,
		UpdatedAt: d.UpdatedAt,
	}
}

// model.Category のスライス → domain.Category のスライス
func ToCategoryDomainList(models []*model.Category) []*domain.Category {
	domains := make([]*domain.Category, 0, len(models))
	for _, m := range models {
		if m != nil {
			domains = append(domains, ToCategoryDomain(m))
		}
	}
	return domains
}

// domain.Category のスライス → model.Category のスライス
func ToCategoryModelList(domains []*domain.Category) []*model.Category {
	models := make([]*model.Category, 0, len(domains))
	for _, d := range domains {
		if d != nil {
			models = append(models, ToCategoryModel(d))
		}
	}
	return models
}
