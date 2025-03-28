package domain

import (
	"database/sql/driver"
	"encoding/json"
	"fmt"
)

// SNS情報
type SNSLink struct {
	Platform     string `json:"platform"`
	PlatformName string `json:"platform_name,omitempty"`
	URL          string `json:"url"`
}

// JSON保存用スライス方
type SNSLinks []SNSLink

// DB保存時にJSON変換
func (s SNSLinks) Value() (driver.Value, error) {
	return json.Marshal(s)
}

// DB取得時にJSONから構造体に変換
func (s *SNSLinks) Scan(value interface{}) error {
	bytes, ok := value.([]byte)
	if !ok {
		return fmt.Errorf("failed to scan SNSLinks: %v", value)
	}
	return json.Unmarshal(bytes, s)
}
