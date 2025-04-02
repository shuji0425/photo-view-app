package converter

import (
	"backend/internal/domain"
	"backend/internal/model"
)

// ToPhotoExifModel は domain.PhotoExif を model.PhotoExif に変換します
func ToPhotoExifModel(e *domain.PhotoExif) *model.PhotoExif {
	if e == nil {
		return nil
	}
	return &model.PhotoExif{
		PhotoID:      e.PhotoID,
		CameraMake:   e.CameraMake,
		CameraModel:  e.CameraModel,
		LensModel:    e.LensModel,
		ISO:          e.ISO,
		FNumber:      e.FNumber,
		ExposureTime: e.ExposureTime,
		FocalLength:  e.FocalLength,
		WhiteBalance: e.WhiteBalance,
		Orientation:  e.Orientation,
		TakenAt:      e.TakenAt,
		CreatedAt:    e.CreatedAt,
		UpdatedAt:    e.UpdatedAt,
	}
}

// ToPhotoExifDomain は model.PhotoExif を domain.PhotoExif に変換します
func ToPhotoExifDomain(m *model.PhotoExif) *domain.PhotoExif {
	if m == nil {
		return nil
	}
	return &domain.PhotoExif{
		PhotoID:      m.PhotoID,
		CameraMake:   m.CameraMake,
		CameraModel:  m.CameraModel,
		LensModel:    m.LensModel,
		ISO:          m.ISO,
		FNumber:      m.FNumber,
		ExposureTime: m.ExposureTime,
		FocalLength:  m.FocalLength,
		WhiteBalance: m.WhiteBalance,
		Orientation:  m.Orientation,
		TakenAt:      m.TakenAt,
		CreatedAt:    m.CreatedAt,
		UpdatedAt:    m.UpdatedAt,
	}
}
