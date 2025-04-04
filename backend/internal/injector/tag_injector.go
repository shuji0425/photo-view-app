package injector

import (
	"backend/internal/handler"
	"backend/internal/repository"
	"backend/internal/service"
	"backend/internal/usecase"

	"gorm.io/gorm"
)

// タグの依存注入
func InjectTagHandler(db *gorm.DB) *handler.TagHandler {
	tagRepo := repository.NewTagRepository(db)
	tagService := service.NewTagService(tagRepo)
	tagUsecate := usecase.NewTagUsecase(tagService)
	return handler.NewTagHandler(tagUsecate)
}
