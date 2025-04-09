package injector

import (
	handler "backend/internal/handler/public"
	"backend/internal/infrastructure"
	"backend/internal/repository"
	"backend/internal/service"
	"backend/internal/usecase"

	"gorm.io/gorm"
)

// 公開用の写真のインジェクター
func InjectPublicPhotoHandler(db *gorm.DB) *handler.PublicPhotoHandler {
	// 画像保存
	imageSaver := infrastructure.NewImageSaver("../frontend/public")
	// レポジトリー
	photoTagRepo := repository.NewPhotoTagRepository(db)
	tagRepo := repository.NewTagRepository(db)
	photoRepo := repository.NewPhotoRepository(db, tagRepo)
	// サービス
	photoTagService := service.NewPhotoTagService(photoTagRepo)
	photoService := service.NewPhotoService(photoRepo, imageSaver)
	// ユースケース
	photoTagUsecase := usecase.NewPhotoTagUsecase(photoTagService)
	photoUsecase := usecase.NewPhotoUsecase(photoService)
	return handler.NewPublicPhotoHandler(photoTagUsecase, photoUsecase)

}
