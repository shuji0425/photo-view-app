package injector

import (
	"backend/internal/infrastructure"
	"backend/internal/usecase"

	"gorm.io/gorm"
)

// 構造体
type Usecases struct {
	Auth           usecase.AuthUsecase
	Category       usecase.CategoryUsecase
	MetadataPolicy usecase.MetadataPolicyUsecase
	Photo          usecase.PhotoUsecase
	PhotoTag       usecase.PhotoTagUsecase
	Profile        usecase.ProfileUsecase
	Tag            usecase.TagUsecase
	User           usecase.UserUsecase
}

func InjectAll(db *gorm.DB, imageSaver infrastructure.ImageSaver) *Usecases {
	return &Usecases{
		Auth:           InjectAuthUsecase(db),
		Category:       InjectCategoryUsecase(db),
		MetadataPolicy: InjectMetadataPolicyUsecase(db),
		Photo:          InjectPhotoUsecase(db, imageSaver),
		PhotoTag:       InjectPhotoTagUsecase(db),
		Profile:        InjectProfileUsecase(db, imageSaver),
		Tag:            InjectTagUsecase(db),
		User:           InjectUserUsecase(db),
	}
}
