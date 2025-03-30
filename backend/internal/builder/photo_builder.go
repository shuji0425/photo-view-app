package builder

import "backend/internal/domain"

// 最低限の情報から domain.Photo を構築
func BuildPhoto(imageURL string, aspectRatio float64, userID int64) *domain.Photo {
	return &domain.Photo{
		ImageURL:    imageURL,
		AspectRatio: aspectRatio,
		UserID:      &userID,
		IsVisible:   false,
	}
}
