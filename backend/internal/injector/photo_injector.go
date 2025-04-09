package injector

import (
	"backend/internal/infrastructure"
	"backend/internal/repository"
	"backend/internal/service"
	"backend/internal/usecase"

	"gorm.io/gorm"
)

// 写真のインジェクター
func InjectPhotoUsecase(db *gorm.DB, imageSaver infrastructure.ImageSaver) usecase.PhotoUsecase {
	// レポジトリー
	tagRepo := repository.NewTagRepository(db)
	photoRepo := repository.NewPhotoRepository(db, tagRepo)

	// 写真
	photoService := service.NewPhotoService(photoRepo, imageSaver)
	return usecase.NewPhotoUsecase(photoService)

}
