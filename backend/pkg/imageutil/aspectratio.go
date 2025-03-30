package imageutil

import (
	"image"
	"os"
)

// 画像からアスペクト比を算出
func GetAspectRatio(path string) (float64, error) {
	f, err := os.Open(path)
	if err != nil {
		return 1.0, err
	}
	defer f.Close()

	// cfg = config
	cfg, _, err := image.DecodeConfig(f)
	if err != nil || cfg.Height == 0 {
		return 1.0, nil
	}
	return float64(cfg.Width) / float64(cfg.Height), nil
}
