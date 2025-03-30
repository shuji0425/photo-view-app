package dto

// PhotoUploadResponse は画像アップロード後に返すID配列
type PhotoUploadResponse struct {
	PhotoIDs []int64 `json:"photo_ids"`
}
