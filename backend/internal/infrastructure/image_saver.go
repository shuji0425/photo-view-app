package infrastructure

import (
	"fmt"
	"mime/multipart"
	"os"
	"path/filepath"
)

// インターフェース
type ImageSaver interface {
	Save(file *multipart.FileHeader, category string, filename string) (string, error)
	SaveMultiple(files []*multipart.FileHeader, category string, generateFilename func(int) string) ([]string, error)
	BasePath() string
	PhotoBasePath() string
	Delete(url string) error
}

// 構造体
type imageSaver struct {
	baseDir string
}

// 依存注入
func NewImageSaver(baseDir string) ImageSaver {
	return &imageSaver{baseDir}
}

// 単体画像の保存
func (s *imageSaver) Save(file *multipart.FileHeader, category string, filename string) (string, error) {
	// 保存パスの作成
	savePath := filepath.Join(s.PhotoBasePath(), category)
	if err := os.MkdirAll(savePath, os.ModePerm); err != nil {
		return "", nil
	}

	// 画像を保存
	dst := filepath.Join(savePath, filename)
	if err := saveUploadedFile(file, dst); err != nil {
		return "", nil
	}

	return fmt.Sprintf("/images/%s/%s", category, filename), nil
}

// 複数画像の保存
func (s *imageSaver) SaveMultiple(files []*multipart.FileHeader, category string, generateFilename func(int) string) ([]string, error) {
	savePath := filepath.Join(s.PhotoBasePath(), category)
	if err := os.MkdirAll(savePath, os.ModePerm); err != nil {
		return nil, err
	}

	var urls []string
	for i, file := range files {
		filename := generateFilename(i)
		dst := filepath.Join(savePath, filename)
		if err := saveUploadedFile(file, dst); err != nil {
			return nil, err
		}
		urls = append(urls, fmt.Sprintf("/images/%s/%s", category, filename))
	}
	return urls, nil
}

// 共通ファイル保存処理
func saveUploadedFile(file *multipart.FileHeader, dst string) error {
	// 保存先ディレクトリを作成
	src, err := file.Open()
	if err != nil {
		return err
	}
	defer src.Close()

	out, err := os.Create(dst)
	if err != nil {
		return err
	}
	defer out.Close()

	_, err = out.ReadFrom(src)
	return err
}

// ベースパス
func (s *imageSaver) BasePath() string {
	return s.baseDir
}

// 保存する場所 ../frontend/public/images/
func (s *imageSaver) PhotoBasePath() string {
	return fmt.Sprintf("%s/images", s.baseDir)
}

// ファイル削除
func (s *imageSaver) Delete(url string) error {
	// URLからローカルパスを構築
	path := filepath.Join(s.baseDir, filepath.FromSlash(url))
	return os.Remove(path)
}
