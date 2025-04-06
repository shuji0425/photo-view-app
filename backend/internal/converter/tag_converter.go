package converter

import (
	"backend/internal/domain"
	"backend/internal/dto"
	"backend/internal/model"
)

// model -> domain
func ToDomainTag(m *model.Tag) *domain.Tag {
	if m == nil {
		return nil
	}
	return &domain.Tag{
		ID:         m.ID,
		Name:       m.Name,
		CategoryID: m.CategoryID,
		SortOrder:  m.SortOrder,
	}
}

// model -> domain (複数)
func ToDomainTags(models []*model.Tag) []*domain.Tag {
	domains := make([]*domain.Tag, 0, len(models))
	for _, m := range models {
		domains = append(domains, ToDomainTag(m))
	}
	return domains
}

// domain -> DTO
func ToDtoTag(t *domain.Tag) *dto.TagResponse {
	if t == nil {
		return nil
	}
	return &dto.TagResponse{
		ID:         t.ID,
		Name:       t.Name,
		CategoryID: t.CategoryID,
		SortOrder:  t.SortOrder,
	}
}

// domain -> dto
func ToDtoTags(domains []*domain.Tag) []*dto.TagResponse {
	result := make([]*dto.TagResponse, 0, len(domains))
	for _, d := range domains {
		result = append(result, ToDtoTag(d))
	}
	return result
}

// タグ並び順更新用
func ToDomainTagSort(dtoList []dto.TagSortRequest) []domain.TagSortUpdate {
	domains := make([]domain.TagSortUpdate, 0, len(dtoList))
	for _, d := range dtoList {
		domains = append(domains, domain.TagSortUpdate{
			ID:        d.ID,
			SortOrder: d.SortOrder,
		})
	}
	return domains
}
