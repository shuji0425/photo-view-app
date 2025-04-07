package injector

import (
	handler "backend/internal/handler/admin"
	"backend/internal/repository"
	"backend/internal/service"
	"backend/internal/usecase"

	"gorm.io/gorm"
)

// 写真タグのインジェクター
func InjectPhotoTagHandler(db *gorm.DB) *handler.PhotoTagHandler {
	photoTagRepo := repository.NewPhotoTagRepository(db)
	photoTagService := service.NewPhotoTagService(photoTagRepo)
	photoTagUsecase := usecase.NewPhotoTagUsecase(photoTagService)
	return handler.NewPhotoTagHandler(photoTagUsecase)

}
