package imageutil

import (
	"backend/internal/domain"
	"log"
	"os"
	"path/filepath"
	"strconv"
	"strings"
	"time"

	"github.com/rwcarlsen/goexif/exif"
)

// 画像からExifとGPS情報を抽出し構造体に変換（JPEG・HEICのみ対応）
func ExtractExifAndGPS(path string) (*domain.PhotoExif, *domain.PhotoGPS) {
	ext := strings.ToLower(filepath.Ext(path))

	// 対応形式以外はスキップ
	if ext != ".jpg" && ext != ".jpeg" && ext != ".heic" && ext != ".heif" {
		log.Printf("[INFO] 対応形式ではないためExif読み込みスキップ: %s", path)
		return &domain.PhotoExif{}, &domain.PhotoGPS{}
	}

	// TODO: iPhoneは今後対応
	// JPEG → goexif対応、HEICは未サポート（今後対応可能性あり）
	if ext == ".heic" || ext == ".heif" {
		log.Printf("[INFO] HEIC/HEIF形式ですがExif読み込み処理は未実装: %s", path)
		return &domain.PhotoExif{}, &domain.PhotoGPS{}
	}

	file, err := os.Open(path)
	if err != nil {
		log.Printf("画像読み込みエラー: %v", err)
		return &domain.PhotoExif{}, &domain.PhotoGPS{}
	}
	defer file.Close()

	x, err := exif.Decode(file)
	if err != nil {
		log.Printf("[INFO] Exif情報なし: %v（%s）", err, path)
		return &domain.PhotoExif{}, &domain.PhotoGPS{}
	}

	// 値の取得関数
	// 文字列
	getString := func(tag exif.FieldName) *string {
		val, err := x.Get(tag)
		if err != nil || val == nil {
			return nil
		}

		str, err := val.StringVal()
		if err != nil {
			return nil
		}

		return &str
	}

	// 浮動小数
	getFloat := func(tag exif.FieldName) *float64 {
		val, err := x.Get(tag)
		if err != nil || val == nil {
			return nil
		}

		rat, _ := val.Rat(0)
		f, _ := rat.Float64()
		return &f
	}

	// 整数
	getInt := func(tag exif.FieldName) *int {
		val, err := x.Get(tag)
		if err != nil || val == nil {
			return nil
		}

		i, err := strconv.Atoi(val.String())
		if err != nil {
			return nil
		}
		return &i
	}

	// 撮影日時
	var takenAt *time.Time
	if t, err := x.DateTime(); err == nil {
		takenAt = &t
	}

	// GPS
	var gps *domain.PhotoGPS
	if lat, lon, err := x.LatLong(); err == nil {
		gps = &domain.PhotoGPS{
			Latitude:  &lat,
			Longitude: &lon,
			IsVisible: false,
		}
	} else {
		gps = &domain.PhotoGPS{}
	}

	// Exif
	exifData := &domain.PhotoExif{
		CameraMake:   getString(exif.Make),
		CameraModel:  getString(exif.Model),
		LensModel:    getString(exif.LensModel),
		ISO:          getInt(exif.ISOSpeedRatings),
		FNumber:      getFloat(exif.FNumber),
		ExposureTime: getString(exif.ExposureTime),
		FocalLength:  getString(exif.FocalLength),
		WhiteBalance: getString(exif.WhiteBalance),
		Orientation:  getString(exif.Orientation),
		TakenAt:      takenAt,
	}

	return exifData, gps
}
