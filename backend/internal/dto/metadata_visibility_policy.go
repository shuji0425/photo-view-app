package dto

// リクエストとレスポンス兼用
type MetadataPolicyDTO struct {
	ShowCameraMake   bool `json:"show_camera_make"`
	ShowCameraModel  bool `json:"show_camera_model"`
	ShowLensModel    bool `json:"show_lens_model"`
	ShowISO          bool `json:"show_iso"`
	ShowFNumber      bool `json:"show_f_number"`
	ShowExposureTime bool `json:"show_exposure_time"`
	ShowFocalLength  bool `json:"show_focal_length"`
	ShowWhiteBalance bool `json:"show_white_balance"`
	ShowOrientation  bool `json:"show_orientation"`
	ShowTakenAt      bool `json:"show_taken_at"`
	ShowGPS          bool `json:"show_gps"`
}
