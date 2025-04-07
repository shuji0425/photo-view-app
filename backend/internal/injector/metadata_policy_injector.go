package injector

import (
	"backend/internal/handler"
	"backend/internal/repository"
	"backend/internal/service"
	"backend/internal/usecase"

	"gorm.io/gorm"
)

func InjectMetadataPolicyHandler(db *gorm.DB) *handler.MetadataPolicyHandler {
	// メタデータポリシー
	metadataPolicyRepo := repository.NewMetadataPolicyRepository(db)
	metadataPolicyService := service.NewMetadataPolicyService(metadataPolicyRepo)
	metadataPolicyUsecase := usecase.NewMetadataPolicyUsecase(metadataPolicyService)
	return handler.NewMetadataPolicyHandler(metadataPolicyUsecase)
}
