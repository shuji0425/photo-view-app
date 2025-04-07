package service

import (
	"backend/internal/domain"
	"backend/internal/repository"
	"context"
)

// インターフェース
type MetadataPolicyService interface {
	GetByUserID(ctx context.Context, userID int64) (*domain.MetadataVisibilityPolicy, error)
	CreateOrUpdate(ctx context.Context, policy *domain.MetadataVisibilityPolicy) error
}

// 構造体
type metadataPolicyService struct {
	metadataPolicyRepo repository.MetadataPolicyRepository
}

// 依存注入用
func NewMetadataPolicyService(metadataPolicyRepo repository.MetadataPolicyRepository) MetadataPolicyService {
	return &metadataPolicyService{metadataPolicyRepo}
}

// ユーザーIDに紐づくメタデータ表示ポリシーを取得
func (s *metadataPolicyService) GetByUserID(ctx context.Context, userID int64) (*domain.MetadataVisibilityPolicy, error) {
	return s.metadataPolicyRepo.FindByUserID(ctx, userID)
}

// メタデータ表示ポリシーを作成or更新
func (s *metadataPolicyService) CreateOrUpdate(ctx context.Context, policy *domain.MetadataVisibilityPolicy) error {
	return s.metadataPolicyRepo.CreateOrUpdate(ctx, policy)
}
