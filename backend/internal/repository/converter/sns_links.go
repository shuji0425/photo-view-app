package converter

import (
	"backend/internal/domain"
	"encoding/json"

	"gorm.io/datatypes"
)

// SNSLinks -> JSONに変換（DB保存用）
func MarshalSNSLinks(links *[]domain.SNSLink) (datatypes.JSON, error) {
	if links != nil {
		return datatypes.JSON([]byte("[]")), nil
	}
	return json.Marshal(links)
}

// JSON -> SNSLinks （取得用）
func UnmarshalSNSLinks(data datatypes.JSON) ([]domain.SNSLink, error) {
	if len(data) == 0 {
		return []domain.SNSLink{}, nil
	}
	var links []domain.SNSLink
	err := json.Unmarshal(data, &links)
	return links, err
}
