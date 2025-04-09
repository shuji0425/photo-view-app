package injector

import (
	"backend/internal/repository"
	"backend/internal/service"
	"backend/internal/usecase"

	"gorm.io/gorm"
)

// 写真タグのインジェクター
func InjectPhotoTagUsecase(db *gorm.DB) usecase.PhotoTagUsecase {
	photoTagRepo := repository.NewPhotoTagRepository(db)
	photoTagService := service.NewPhotoTagService(photoTagRepo)
	return usecase.NewPhotoTagUsecase(photoTagService)
}
