package injector

import (
	"backend/internal/handler"
	"backend/internal/service"
	"backend/internal/usecase"
)

// タグの依存注入
func InjectTagHandler() *handler.TagHandler {
	tagService := service.NewTagService()
	tagUsecate := usecase.NewTagUsecase(tagService)
	return handler.NewTagHandler(tagUsecate)
}
