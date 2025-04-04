package converter

import (
	"backend/internal/domain"
	"backend/internal/model"
)

// ToPhotoGPSModel は domain.PhotoGPS を model.PhotoGPS に変換します
func ToPhotoGPSModel(g *domain.PhotoGPS) *model.PhotoGPS {
	if g == nil {
		return nil
	}
	return &model.PhotoGPS{
		PhotoID:   g.PhotoID,
		Latitude:  g.Latitude,
		Longitude: g.Longitude,
		IsVisible: g.IsVisible,
	}
}

// ToPhotoGPSDomain は model.PhotoGPS を domain.PhotoGPS に変換します
func ToPhotoGPSDomain(m *model.PhotoGPS) *domain.PhotoGPS {
	if m == nil {
		return nil
	}
	return &domain.PhotoGPS{
		PhotoID:   m.PhotoID,
		Latitude:  m.Latitude,
		Longitude: m.Longitude,
		IsVisible: m.IsVisible,
	}
}
