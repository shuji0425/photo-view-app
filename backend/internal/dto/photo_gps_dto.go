package dto

// GPS 情報レスポンス
type PhotoGPSResponse struct {
	Latitude  *float64 `json:"latitude,omitempty"`
	Longitude *float64 `json:"longitude,omitempty"`
}
