package repository

import (
	"backend/internal/model"

	"gorm.io/gorm"
)

// インターフェース
type TagRepository interface {
	FindOrCreateTags(tx *gorm.DB, names []string) ([]int64, error)
}

// 構造体
type tagRepository struct {
	db *gorm.DB
}

// 依存注入用
func NewTagRepository(db *gorm.DB) TagRepository {
	return &tagRepository{db}
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
