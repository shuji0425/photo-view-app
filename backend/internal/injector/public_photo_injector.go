package injector

import (
	handler "backend/internal/handler/public"
	"backend/internal/repository"
	"backend/internal/service"
	"backend/internal/usecase"

	"gorm.io/gorm"
)

// 公開用の写真のインジェクター
func InjectPublicPhotoHandler(db *gorm.DB) *handler.PublicPhotoHandler {
	photoTagRepo := repository.NewPhotoTagRepository(db)
	photoTagService := service.NewPhotoTagService(photoTagRepo)
	photoTagUsecase := usecase.NewPhotoTagUsecase(photoTagService)
	return handler.NewPublicPhotoHandler(photoTagUsecase)

}
