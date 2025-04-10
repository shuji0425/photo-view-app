package injector

import (
	"backend/internal/repository"
	"backend/internal/service"
	"backend/internal/usecase"

	"gorm.io/gorm"
)

func InjectMetadataPolicyUsecase(db *gorm.DB) usecase.MetadataPolicyUsecase {
	// メタデータポリシー
	metadataPolicyRepo := repository.NewMetadataPolicyRepository(db)
	metadataPolicyService := service.NewMetadataPolicyService(metadataPolicyRepo)
	return usecase.NewMetadataPolicyUsecase(metadataPolicyService)
}
