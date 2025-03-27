package service

import (
	"backend/internal/infrastructure"
	"fmt"
	"mime/multipart"
	"os"
	"path/filepath"
	"time"
)

// インターフェース
type ImageService interface {
	SaveAvatar(userID int64, file *multipart.FileHeader) (string, error)
}

// 構造体
type imageService struct {
	imageSaver infrastructure.ImageSaver
}

// 依存注入用
func NewImageService(imageSaver infrastructure.ImageSaver) ImageService {
	return &imageService{imageSaver}
}

// アイコン画像を保存
func (s *imageService) SaveAvatar(userID int64, file *multipart.FileHeader) (string, error) {
	// 保存ディレクトリ
	saveDir := filepath.Join(s.imageSaver.BasePath(), "profile")

	// 古い画像を削除
	pattern := fmt.Sprintf("user_%d_*.webp", userID)
	matches, _ := filepath.Glob(filepath.Join(saveDir, pattern))
	for _, m := range matches {
		os.Remove(m)
	}

	// 新しいファイルパスを作成
	timestamp := time.Now().Format("2006010215045")
	filename := fmt.Sprintf("user_%d_%s.webp", userID, timestamp)

	// ファイル保存
	url, err := s.imageSaver.Save(file, "profile", filename)
	if err != nil {
		return "", err
	}
	return url, nil
}
