package converter

import (
	"backend/internal/domain"
	"backend/internal/dto"
)

// domain to dto 変換
func ConvertToDetailsResponse(photos []*domain.Photo) []dto.PhotoDetail {
	var result []dto.PhotoDetail

	// 変換
	for _, photo := range photos {
		result = append(result, dto.PhotoDetail{
			ID:          photo.ID,
			ImageURL:    photo.ImageURL,
			AspectRatio: photo.AspectRatio,
			Title:       photo.Title,
			Description: photo.Description,
			CategoryID:  photo.CategoryID,
			UserID:      photo.UserID,
			IsVisible:   photo.IsVisible,
			TakenAt:     photo.TakenAt,
		})
	}

	return result
}
