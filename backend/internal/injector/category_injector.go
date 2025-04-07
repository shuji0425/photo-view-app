package injector

import (
	handler "backend/internal/handler/admin"
	"backend/internal/repository"
	"backend/internal/service"
	"backend/internal/usecase"

	"gorm.io/gorm"
)

func InjectCategoryHandler(db *gorm.DB) *handler.CategoryHandler {
	// カテゴリー
	categoryRepo := repository.NewCategoryRepository(db)
	categoryService := service.NewCategoryService(categoryRepo)
	categoryUsecase := usecase.NewCategoryUsecase(categoryService)
	return handler.NewCategoryHandler(categoryUsecase)
}
