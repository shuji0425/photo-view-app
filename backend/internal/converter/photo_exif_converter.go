package converter

import (
	"backend/internal/domain"
	"backend/internal/dto"
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
	}
}

// domain -> dto
func ToExifDTO(exif *domain.PhotoExif) *dto.PhotoExifResponse {
	if exif == nil {
		return nil
	}

	return &dto.PhotoExifResponse{
		CameraMake:   exif.CameraMake,
		CameraModel:  exif.CameraModel,
		LensModel:    exif.LensModel,
		ISO:          exif.ISO,
		FNumber:      exif.FNumber,
		ExposureTime: exif.ExposureTime,
		FocalLength:  exif.FocalLength,
		WhiteBalance: exif.WhiteBalance,
		Orientation:  exif.Orientation,
		TakenAt:      exif.TakenAt,
	}
}
