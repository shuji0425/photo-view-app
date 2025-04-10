package converter

import (
	"backend/internal/domain"
	"backend/internal/dto"
	"backend/internal/model"
	"backend/pkg/util"
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

// MetadataVisibilityPolicy に従って、Exif情報をマスキングしつつ domain 変換
func ToDomainExifWithPolicy(exif *model.PhotoExif, policy *model.MetadataVisibilityPolicy) *domain.PhotoExif {
	if exif == nil || policy == nil {
		return nil
	}

	return &domain.PhotoExif{
		CameraMake:   util.IfVisible(policy.ShowCameraMake, exif.CameraMake),
		CameraModel:  util.IfVisible(policy.ShowCameraModel, exif.CameraModel),
		LensModel:    util.IfVisible(policy.ShowLensModel, exif.LensModel),
		ISO:          util.IfVisibleInt(policy.ShowISO, exif.ISO),
		FNumber:      util.IfVisibleFloat(policy.ShowFNumber, exif.FNumber),
		ExposureTime: util.IfVisible(policy.ShowExposureTime, exif.ExposureTime),
		FocalLength:  util.IfVisible(policy.ShowFocalLength, exif.FocalLength),
		WhiteBalance: util.IfVisible(policy.ShowWhiteBalance, exif.WhiteBalance),
		Orientation:  util.IfVisible(policy.ShowOrientation, exif.Orientation),
		TakenAt:      util.IfVisibleTime(policy.ShowTakenAt, exif.TakenAt),
	}
}
