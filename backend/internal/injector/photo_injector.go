package injector

import (
	"backend/internal/handler"
	"backend/internal/infrastructure"
	"backend/internal/repository"
	"backend/internal/service"
	"backend/internal/usecase"

	"gorm.io/gorm"
)

// 写真のインジェクター
func InjectPhotoHandler(db *gorm.DB) *handler.PhotoHandler {
	// 画像
	imageSaver := infrastructure.NewImageSaver("../frontend/public")

	// レポジトリー
	tagRepo := repository.NewTagRepository(db)
	photoRepo := repository.NewPhotoRepository(db, tagRepo)

	// 写真
	photoService := service.NewPhotoService(photoRepo, imageSaver)
	photoUsecase := usecase.NewPhotoUsecase(photoService)
	return handler.NewPhotoHandler(photoUsecase)

}
