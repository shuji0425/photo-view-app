package domain

// メタ表示ポリシー
type MetadataVisibilityPolicy struct {
	UserID           int64
	ShowCameraMake   bool
	ShowCameraModel  bool
	ShowLensModel    bool
	ShowISO          bool
	ShowFNumber      bool
	ShowExposureTime bool
	ShowFocalLength  bool
	ShowWhiteBalance bool
	ShowOrientation  bool
	ShowTakenAt      bool
	ShowGPS          bool
}
