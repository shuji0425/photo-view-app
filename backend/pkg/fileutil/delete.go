package fileutil

import (
	"log"
	"os"
	"path/filepath"
)

// 受け取ったファイルパス一覧を削除
func DeleteFiles(basePath string, relativePaths []string) {
	for _, rel := range relativePaths {
		abs := filepath.Join(basePath, rel)
		if err := os.Remove(abs); err != nil {
			log.Printf("[WARN] ファイル削除失敗: %s: %v", abs, err)
		} else {
			log.Printf("[INFO] ファイル削除: %s", abs)
		}
	}
}
