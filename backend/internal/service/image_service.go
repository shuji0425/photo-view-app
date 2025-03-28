package service

import (
	"backend/internal/infrastructure"
	"backend/pkg/filename"
	"backend/pkg/fileutil"
	"fmt"
	"mime/multipart"
	"path/filepath"
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
	pattern := fmt.Sprintf("user_%d_avatar_*.webp", userID)
	_ = fileutil.RemoveFilesByGlob(saveDir, pattern)

	// 新しいファイル名を作成
	filename := filename.GenerateProfileAvatarFilename(userID)

	// ファイル保存
	url, err := s.imageSaver.Save(file, "profile", filename)
	if err != nil {
		return "", err
	}
	return url, nil
}
