package imageutil

import (
	"image"
	"log"
	"os"

	_ "golang.org/x/image/webp"
)

// 画像からアスペクト比を算出
func GetAspectRatio(path string) (float64, error) {
	file, err := os.Open(path)
	if err != nil {
		log.Println("file error", err)
		return 0.0, err
	}
	defer file.Close()

	config, _, err := image.DecodeConfig(file)
	if err != nil || config.Height == 0 {
		return 0.0, nil
	}
	return float64(config.Width) / float64(config.Height), nil
}
