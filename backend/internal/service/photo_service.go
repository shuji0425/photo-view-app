package service

import (
	"backend/internal/builder"
	"backend/internal/domain"
	"backend/internal/infrastructure"
	"backend/internal/repository"
	"backend/pkg/filename"
	"backend/pkg/imageutil"
	"fmt"
	"log"
	"mime/multipart"
	"os"
	"path/filepath"
)

// インターフェース
type PhotoService interface {
	GetPhotosByIDs(ids []int64) ([]*domain.Photo, error)
	GetPaginatedPhotos(page, limit int) ([]*domain.Photo, int64, error)
	SaveUploadPhotos(userID int64, files []*multipart.FileHeader) ([]int64, error)
	SavePhotos(photoList []*domain.Photo, savedPaths []string) ([]int64, error)
	DeletePhotosByIDs(ids []int64) error
}

// 構造体
type photoService struct {
	photoRepo  repository.PhotoRepository
	imageSaver infrastructure.ImageSaver
}

// 依存注入用
func NewPhotoService(photoRepo repository.PhotoRepository, imageSaver infrastructure.ImageSaver) PhotoService {
	return &photoService{photoRepo, imageSaver}
}

// id配列から写真情報を取得
func (s *photoService) GetPhotosByIDs(ids []int64) ([]*domain.Photo, error) {
	return s.photoRepo.GetPhotoByIDs(ids)
}

// ページネーション付きで画像を取得
func (s *photoService) GetPaginatedPhotos(page, limit int) ([]*domain.Photo, int64, error) {
	return s.photoRepo.FindPaginated(page, limit)
}

// 画像保存（DBとフォルダに）
func (s *photoService) SaveUploadPhotos(userID int64, files []*multipart.FileHeader) ([]int64, error) {
	// ユーザーごとのファイル名生成
	generateFilename := func(i int) string {
		return filename.GenerateGalleryImageFilename(userID, i)
	}

	// 画像を保存
	urls, err := s.imageSaver.SaveMultiple(files, "photos", generateFilename)
	if err != nil {
		return nil, fmt.Errorf("画像の保存に失敗しました: %w", err)
	}

	var photoList []*domain.Photo
	var savedPaths []string

	for _, url := range urls {
		path := filepath.Join(s.imageSaver.BasePath(), url)

		// アスペクト比計算
		aspectRatio := 1.0
		if ar, err := imageutil.GetAspectRatio(path); err == nil {
			aspectRatio = ar
		}

		// domain.Photoを構築
		photo := builder.BuildPhoto(url, aspectRatio, userID)
		photoList = append(photoList, photo)

		savedPaths = append(savedPaths, filepath.Join("photos", filepath.Base(url)))
	}

	return s.SavePhotos(photoList, savedPaths)
}

// 複数の画像を保存し、それぞれのIDを返す
func (s *photoService) SavePhotos(photoList []*domain.Photo, savedPaths []string) ([]int64, error) {
	var ids []int64

	for i, photo := range photoList {
		id, err := s.photoRepo.SavePhoto(photo)
		if err != nil {
			// エラー発生時は画像ファイルも削除
			absPath := filepath.Join(s.imageSaver.BasePath(), savedPaths[i])
			_ = os.Remove(absPath)
			return nil, fmt.Errorf("DB保存に失敗しました: %w", err)
		}
		ids = append(ids, id)
	}

	return ids, nil
}

// idの配列からDBと画像を削除
func (s *photoService) DeletePhotosByIDs(ids []int64) error {
	// 画像URLを取得
	photos, err := s.photoRepo.GetPhotoByIDs(ids)
	if err != nil {
		return err
	}

	// DBから削除
	if err := s.photoRepo.DeleteByIDs(ids); err != nil {
		return err
	}

	// ファイルを削除
	for _, photo := range photos {
		if err := s.imageSaver.Delete(photo.ImageURL); err != nil {
			log.Printf("画像ファイル削除失敗: %s (%v)", photo.ImageURL, err)
		}
	}

	return nil
}
