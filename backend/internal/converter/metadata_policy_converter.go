package converter

import (
	"backend/internal/domain"
	"backend/internal/dto"
	"backend/internal/model"
)

// model → domain
func ToDomainMetadataPolicy(m *model.MetadataVisibilityPolicy) *domain.MetadataVisibilityPolicy {
	if m == nil {
		return nil
	}
	return &domain.MetadataVisibilityPolicy{
		UserID:           m.UserID,
		ShowCameraMake:   m.ShowCameraMake,
		ShowCameraModel:  m.ShowCameraModel,
		ShowLensModel:    m.ShowLensModel,
		ShowISO:          m.ShowISO,
		ShowFNumber:      m.ShowFNumber,
		ShowExposureTime: m.ShowExposureTime,
		ShowFocalLength:  m.ShowFocalLength,
		ShowWhiteBalance: m.ShowWhiteBalance,
		ShowOrientation:  m.ShowOrientation,
		ShowTakenAt:      m.ShowTakenAt,
		ShowGPS:          m.ShowGPS,
	}
}

// domain → model
func ToModelMetadataPolicy(d *domain.MetadataVisibilityPolicy) *model.MetadataVisibilityPolicy {
	if d == nil {
		return nil
	}
	return &model.MetadataVisibilityPolicy{
		UserID:           d.UserID,
		ShowCameraMake:   d.ShowCameraMake,
		ShowCameraModel:  d.ShowCameraModel,
		ShowLensModel:    d.ShowLensModel,
		ShowISO:          d.ShowISO,
		ShowFNumber:      d.ShowFNumber,
		ShowExposureTime: d.ShowExposureTime,
		ShowFocalLength:  d.ShowFocalLength,
		ShowWhiteBalance: d.ShowWhiteBalance,
		ShowOrientation:  d.ShowOrientation,
		ShowTakenAt:      d.ShowTakenAt,
		ShowGPS:          d.ShowGPS,
	}
}

// domain → dto
func ToMetadataPolicyDTO(d *domain.MetadataVisibilityPolicy) *dto.MetadataPolicyDTO {
	if d == nil {
		return nil
	}
	return &dto.MetadataPolicyDTO{
		ShowCameraMake:   d.ShowCameraMake,
		ShowCameraModel:  d.ShowCameraModel,
		ShowLensModel:    d.ShowLensModel,
		ShowISO:          d.ShowISO,
		ShowFNumber:      d.ShowFNumber,
		ShowExposureTime: d.ShowExposureTime,
		ShowFocalLength:  d.ShowFocalLength,
		ShowWhiteBalance: d.ShowWhiteBalance,
		ShowOrientation:  d.ShowOrientation,
		ShowTakenAt:      d.ShowTakenAt,
		ShowGPS:          d.ShowGPS,
	}
}

// dto → domain
func ToDomainFromMetadataPolicyDTO(dto *dto.MetadataPolicyDTO, userID int64) *domain.MetadataVisibilityPolicy {
	if dto == nil {
		return nil
	}
	return &domain.MetadataVisibilityPolicy{
		UserID:           userID,
		ShowCameraMake:   dto.ShowCameraMake,
		ShowCameraModel:  dto.ShowCameraModel,
		ShowLensModel:    dto.ShowLensModel,
		ShowISO:          dto.ShowISO,
		ShowFNumber:      dto.ShowFNumber,
		ShowExposureTime: dto.ShowExposureTime,
		ShowFocalLength:  dto.ShowFocalLength,
		ShowWhiteBalance: dto.ShowWhiteBalance,
		ShowOrientation:  dto.ShowOrientation,
		ShowTakenAt:      dto.ShowTakenAt,
		ShowGPS:          dto.ShowGPS,
	}
}
