package imageutil

import (
	"image"
	"log"
	"os"

	_ "golang.org/x/image/webp"
)

// 画像からアスペクト比を算出
func GetImageInfo(path string) (width, height int, aspectRatio float64, err error) {
	file, err := os.Open(path)
	if err != nil {
		log.Println("file error", err)
		return 0, 0, 0.0, err
	}
	defer file.Close()

	config, _, err := image.DecodeConfig(file)
	if err != nil || config.Height == 0 {
		return 0, 0, 0.0, err
	}

	width = config.Width
	height = config.Height
	aspectRatio = float64(config.Width) / float64(config.Height)
	return width, height, aspectRatio, nil
}
