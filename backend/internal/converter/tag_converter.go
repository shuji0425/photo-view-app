package converter

import (
	"backend/internal/dto"
	"backend/internal/model"
)

// []string -> []model
func ToTagModelsFromNames(names []string) []model.Tag {
	var tags []model.Tag
	for _, name := range names {
		tags = append(tags, model.Tag{Name: name})
	}
	return tags
}

// []model.Tag -> []dto.TagResponse
func ToTagDTOList(models []model.Tag) []dto.TagResponse {
	var tags []dto.TagResponse
	for _, m := range models {
		tags = append(tags, dto.TagResponse{
			ID:        m.ID,
			Name:      m.Name,
			SortOrder: m.SortOrder,
		})
	}
	return tags
}
