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
		URL:       d.URL,
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
