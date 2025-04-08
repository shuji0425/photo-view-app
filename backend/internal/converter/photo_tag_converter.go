package converter

import (
	"backend/internal/domain"
	"backend/internal/dto"
)

// domain -> dto
func ToDtoPhotoWithSortOrder(d *domain.PhotoWithSortOrder) *dto.PhotoWithSortOrder {
	if d == nil {
		return nil
	}
	return &dto.PhotoWithSortOrder{
		PhotoID:   d.PhotoID,
		URL:       d.ImageURL,
		SortOrder: d.SortOrder,
	}
}

// domain -> dto (複数)
func ToDtoPhotoWithSortOrders(domains []*domain.PhotoWithSortOrder) []*dto.PhotoWithSortOrder {
	result := make([]*dto.PhotoWithSortOrder, 0, len(domains))
	for _, d := range domains {
		result = append(result, ToDtoPhotoWithSortOrder(d))
	}
	return result
}

// タグ並び順更新用
func ToDomainPhotoTagSort(dtoList []dto.PhotoTagSortUpdate) []domain.PhotoTagSortUpdate {
	domains := make([]domain.PhotoTagSortUpdate, 0, len(dtoList))
	for _, d := range dtoList {
		domains = append(domains, domain.PhotoTagSortUpdate{
			PhotoID:   d.PhotoID,
			SortOrder: d.SortOrder,
		})
	}
	return domains
}

// Public用
func ToDtoPhotoPublic(d *domain.PhotoWithSortOrder) *dto.PhotoPublicDTO {
	if d == nil {
		return nil
	}
	return &dto.PhotoPublicDTO{
		ID:          d.PhotoID,
		URL:         d.ImageURL,
		AspectRatio: d.AspectRatio,
		Title:       d.Title,
		Description: d.Description,
		TakenAt:     d.TakenAt,
		SortOrder:   d.SortOrder,
	}
}

// domain -> dto (複数)
func ToDtoPhotosPublic(domains []*domain.PhotoWithSortOrder) []*dto.PhotoPublicDTO {
	result := make([]*dto.PhotoPublicDTO, 0, len(domains))
	for _, d := range domains {
		result = append(result, ToDtoPhotoPublic(d))
	}
	return result
}
