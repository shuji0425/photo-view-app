package usecase

import (
	"backend/internal/converter"
	"backend/internal/domain"
	"backend/internal/dto"
	"backend/internal/service"
	"context"
)

// インターフェース
type MetadataPolicyUsecase interface {
	GetByUserID(ctx context.Context, userID int64) (*dto.MetadataPolicyDTO, error)
	CreateOrUpdate(ctx context.Context, input *domain.MetadataVisibilityPolicy) error
}

// 構造体
type metadataPolicyUsecase struct {
	metadataPolicyService service.MetadataPolicyService
}

// 依存注入用
func NewMetadataPolicyUsecase(metadataPolicyService service.MetadataPolicyService) MetadataPolicyUsecase {
	return &metadataPolicyUsecase{metadataPolicyService}
}

// ユーザーIDからメタデータ表示ポリシーを取得
func (u *metadataPolicyUsecase) GetByUserID(ctx context.Context, userID int64) (*dto.MetadataPolicyDTO, error) {
	policy, err := u.metadataPolicyService.GetByUserID(ctx, userID)
	if err != nil {
		return nil, err
	}

	return converter.ToMetadataPolicyDTO(policy), nil
}

// メタデータ表示ポリシーを作成or更新
func (u *metadataPolicyUsecase) CreateOrUpdate(ctx context.Context, input *domain.MetadataVisibilityPolicy) error {
	return u.metadataPolicyService.CreateOrUpdate(ctx, input)
}
