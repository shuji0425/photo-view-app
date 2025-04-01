package converter

import (
	"backend/internal/domain"
	"backend/internal/dto"
	"backend/internal/model"
)

// dto -> domain（更新）
func ToPhotoFromUpdateDTO(dto *dto.PhotoUpdateRequest) *domain.Photo {
	return &domain.Photo{
		ID:          dto.PhotoID,
		Title:       dto.Title,
		Description: dto.Description,
		CategoryID:  dto.CategoryID,
		IsVisible:   dto.IsVisible,
		TakenAt:     dto.TakenAt,
	}
}

// domain -> model（DB保存用）
func ToPhotoModel(p *domain.Photo) *model.Photo {
	return &model.Photo{
		ID:          p.ID,
		Title:       p.Title,
		Description: p.Description,
		CategoryID:  p.CategoryID,
		IsVisible:   p.IsVisible,
		TakenAt:     p.TakenAt,
	}
}

// domain -> dto（単体）
func ToPhotoDetail(p *domain.Photo) dto.PhotoDetail {
	return dto.PhotoDetail{
		ID:          p.ID,
		ImageURL:    p.ImageURL,
		AspectRatio: p.AspectRatio,
		Title:       p.Title,
		Description: p.Description,
		CategoryID:  p.CategoryID,
		UserID:      p.UserID,
		IsVisible:   p.IsVisible,
		TakenAt:     p.TakenAt,
	}
}

// domain to dto 変換
func ToDetailsList(photos []*domain.Photo) []dto.PhotoDetail {
	result := make([]dto.PhotoDetail, 0, len(photos))

	// 変換
	for _, photo := range photos {
		result = append(result, ToPhotoDetail(photo))
	}

	return result
}
