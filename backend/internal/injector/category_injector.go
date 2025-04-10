package injector

import (
	"backend/internal/repository"
	"backend/internal/service"
	"backend/internal/usecase"

	"gorm.io/gorm"
)

func InjectCategoryUsecase(db *gorm.DB) usecase.CategoryUsecase {
	// カテゴリー
	categoryRepo := repository.NewCategoryRepository(db)
	categoryService := service.NewCategoryService(categoryRepo)
	return usecase.NewCategoryUsecase(categoryService)
}
