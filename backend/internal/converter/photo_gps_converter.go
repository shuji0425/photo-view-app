package converter

import (
	"backend/internal/domain"
	"backend/internal/dto"
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

// domain -> dto
func ToGPSDTO(gps *domain.PhotoGPS) *dto.PhotoGPSResponse {
	if gps == nil {
		return nil
	}

	return &dto.PhotoGPSResponse{
		Latitude:  gps.Latitude,
		Longitude: gps.Longitude,
	}
}

// MetadataVisibilityPolicy に従って、GPS情報をマスキングしつつ domain 変換
func ToDomainGPSWithPolicy(gps *model.PhotoGPS, policy *model.MetadataVisibilityPolicy) *domain.PhotoGPS {
	if gps == nil || policy == nil || !policy.ShowGPS {
		return nil
	}
	return &domain.PhotoGPS{
		Latitude:  gps.Latitude,
		Longitude: gps.Longitude,
	}
}
