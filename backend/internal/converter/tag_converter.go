package converter

import (
	"backend/internal/domain"
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
