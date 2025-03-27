package fileutil

import (
	"os"
	"path/filepath"
)

// 指定パターンに一致するファイルを全て削除
func RemoveFilesByGlob(dir string, pattern string) error {
	fullPattern := filepath.Join(dir, pattern)

	matches, err := filepath.Glob(fullPattern)
	if err != nil {
		return err
	}

	// 削除処理
	for _, path := range matches {
		if err := os.Remove(path); err != nil {
			continue
		}
	}

	return nil
}
