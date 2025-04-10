package imageutil

import (
	"os"

	"github.com/chai2010/webp"
	"github.com/disintegration/imaging"
)

// WebPにリサイズ変換して保存
func ConvertToWebP(inputPath, outputPath string, maxWidth int) error {
	// 画像を開く
	img, err := imaging.Open(inputPath)
	if err != nil {
		return err
	}

	// 横幅を maxWidth にリサイズ
	resized := imaging.Resize(img, maxWidth, 0, imaging.Lanczos)

	// 保存先ファイル作成
	outFile, err := os.Create(outputPath)
	if err != nil {
		return err
	}
	defer outFile.Close()

	// WebPにエンコード
	return webp.Encode(outFile, resized, &webp.Options{
		Lossless: false,
		Quality:  90,
	})
}
