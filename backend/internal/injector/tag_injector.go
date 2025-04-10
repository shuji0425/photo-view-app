package injector

import (
	"backend/internal/repository"
	"backend/internal/service"
	"backend/internal/usecase"

	"gorm.io/gorm"
)

// タグの依存注入
func InjectTagUsecase(db *gorm.DB) usecase.TagUsecase {
	tagRepo := repository.NewTagRepository(db)
	tagService := service.NewTagService(tagRepo)
	return usecase.NewTagUsecase(tagService)
}
