package converter

import (
	"backend/internal/domain"
	"backend/internal/dto"
	"backend/internal/model"
)

// nil なら falseを返す、明示的なfalseも拾える
func safeBool(b *bool) bool {
	if b == nil {
		return false
	}
	return *b
}

// dto -> domain（更新）
func ToPhotoFromUpdateDTO(d *dto.PhotoUpdateRequest) *domain.Photo {
	return &domain.Photo{
		ID:          d.PhotoID,
		Title:       d.Title,
		Description: d.Description,
		CategoryID:  d.CategoryID,
		IsVisible:   safeBool(d.IsVisible),
		TakenAt:     d.TakenAt,
		Tags:        d.Tags,
	}
}

// domain -> model（DB保存用）
func ToPhotoModel(p *domain.Photo) *model.Photo {
	return &model.Photo{
		ID:          p.ID,
		ImageURL:    p.ImageURL,
		AspectRatio: p.AspectRatio,
		Title:       p.Title,
		Description: p.Description,
		CategoryID:  p.CategoryID,
		IsVisible:   p.IsVisible,
		TakenAt:     p.TakenAt,
	}
}

// model -> domain (単体)
func ToDomainPhoto(m *model.Photo) *domain.Photo {
	if m == nil {
		return nil
	}
	return &domain.Photo{
		ID:          m.ID,
		ImageURL:    m.ImageURL,
		AspectRatio: m.AspectRatio,
		Title:       m.Title,
		Description: m.Description,
		CategoryID:  m.CategoryID,
		IsVisible:   m.IsVisible,
		TakenAt:     m.TakenAt,
	}
}

// domain -> dto（単体）
func ToPhotoDetail(p *domain.Photo) *dto.PhotoDetail {
	if p == nil {
		return nil
	}
	return &dto.PhotoDetail{
		ID:          p.ID,
		ImageURL:    p.ImageURL,
		AspectRatio: p.AspectRatio,
		Title:       p.Title,
		Description: p.Description,
		CategoryID:  p.CategoryID,
		UserID:      p.UserID,
		IsVisible:   p.IsVisible,
		TakenAt:     p.TakenAt,
		Tags:        p.Tags,
	}
}

// domain to dto 変換
func ToDetailsList(photos []*domain.Photo) []*dto.PhotoDetail {
	result := make([]*dto.PhotoDetail, 0, len(photos))
	// 変換
	for _, photo := range photos {
		result = append(result, ToPhotoDetail(photo))
	}
	return result
}

// model -> domain (複数)
func ToDomainPhotos(models []*model.Photo) []*domain.Photo {
	domains := make([]*domain.Photo, 0, len(models))
	for _, m := range models {
		domains = append(domains, ToDomainPhoto(m))
	}
	return domains
}

// 写真詳細dto変換
func ToPublicPhotoDetailResponse(detail *domain.PublicPhotoDetail) *dto.PublicPhotoDetailDTO {
	return &dto.PublicPhotoDetailDTO{
		ID:          detail.Photo.ID,
		ImageURL:    detail.Photo.ImageURL,
		AspectRatio: detail.Photo.AspectRatio,
		Title:       detail.Photo.Title,
		Description: detail.Photo.Description,
		TakenAt:     detail.Photo.TakenAt,
		Exif:        ToExifDTO(detail.Exif),
		GPS:         ToGPSDTO(detail.GPS),
		Tags:        ToDtoTags(detail.Tags),
	}
}
