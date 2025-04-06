package repository

import (
	"backend/internal/converter"
	"backend/internal/domain"
	"backend/internal/model"
	"context"

	"gorm.io/gorm"
)

// インターフェース
type TagRepository interface {
	GetAll(ctx context.Context) ([]*domain.Tag, error)
	FindOrCreateTags(tx *gorm.DB, names []string) ([]int64, error)
	FindByQuery(ctx context.Context, query string) ([]*domain.Tag, error)
	UpdateSortOrders(ctx context.Context, updates []domain.TagSortUpdate) error
}

// 構造体
type tagRepository struct {
	db *gorm.DB
}

// 依存注入用
func NewTagRepository(db *gorm.DB) TagRepository {
	return &tagRepository{db}
}

// タグを全件取得
func (r *tagRepository) GetAll(ctx context.Context) ([]*domain.Tag, error) {
	var tags []*model.Tag
	if err := r.db.WithContext(ctx).
		Order(`
			CASE
				WHEN sort_order IS NULL OR sort_order = 0 THEN 1
				ELSE 0
			END,
			sort_order ASC
		`).
		Find(&tags).Error; err != nil {
		return nil, err
	}
	return converter.ToDomainTags(tags), nil
}

// タグ名のリストを受け取り既存と新規のID配列を返却
func (r *tagRepository) FindOrCreateTags(tx *gorm.DB, names []string) ([]int64, error) {
	// タグがないときは空を返却
	if len(names) == 0 {
		return []int64{}, nil
	}

	// 既存のタグを取得
	var existing []model.Tag
	if err := tx.Where("name IN ?", names).Find(&existing).Error; err != nil {
		return nil, err
	}

	// 既存タグの名前とIDをマップ化
	existingMap := map[string]int64{}
	for _, tag := range existing {
		existingMap[tag.Name] = tag.ID
	}

	// 新規作成が必要なタグを抽出
	var toCreate []model.Tag
	for _, name := range names {
		if _, exists := existingMap[name]; !exists {
			toCreate = append(toCreate, model.Tag{Name: name})
		}
	}

	// 新規タグ作成
	if len(toCreate) > 0 {
		if err := tx.Create(&toCreate).Error; err != nil {
			return nil, err
		}
		for _, tag := range toCreate {
			existingMap[tag.Name] = tag.ID
		}
	}

	// 入力順に沿ったIDスライスを返す
	var ids []int64
	for _, name := range names {
		if id, ok := existingMap[name]; ok {
			ids = append(ids, id)
		}
	}

	return ids, nil
}

// 名前に部分一致するタグを取得する
func (r *tagRepository) FindByQuery(ctx context.Context, query string) ([]*domain.Tag, error) {
	var models []*model.Tag

	// クエリが空なら空配列を返却
	if query == "" {
		return []*domain.Tag{}, nil
	}

	// name に部分一致するタグを取得
	if err := r.db.WithContext(ctx).
		Where("name LIKE ?", "%"+query+"%").
		Order("sort_order ASC").
		Limit(10).
		Find(&models).Error; err != nil {
		return nil, err
	}

	return converter.ToDomainTags(models), nil
}

// 並び順を更新する
func (r *tagRepository) UpdateSortOrders(ctx context.Context, updates []domain.TagSortUpdate) error {
	// 更新するための配列を作成
	updateMap := make(map[int64]int)
	for _, u := range updates {
		updateMap[u.ID] = u.SortOrder
	}

	// トランザクション
	return r.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		var models []model.Tag
		if err := tx.Find(&models).Error; err != nil {
			return err
		}

		for _, m := range models {
			order := 0
			// 型チェック
			if v, ok := updateMap[int64(m.ID)]; ok {
				order = v
			}

			// 更新
			if err := tx.Model(&m).Update("sort_order", order).Error; err != nil {
				return err
			}
		}
		return nil
	})
}
