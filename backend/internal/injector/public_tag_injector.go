package injector

import (
	handler "backend/internal/handler/public"
	"backend/internal/repository"
	"backend/internal/service"
	"backend/internal/usecase"

	"gorm.io/gorm"
)

// 公開タグの依存関係
func InjectPublicTagHandler(db *gorm.DB) *handler.PublicTagHandler {
	tagRepo := repository.NewTagRepository(db)
	tagService := service.NewTagService(tagRepo)
	tagUsecate := usecase.NewTagUsecase(tagService)
	return handler.NewPublicTagHandler(tagUsecate)
}
