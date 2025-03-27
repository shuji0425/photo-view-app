package filename

import (
	"fmt"
	"time"
)

// 現在時刻をフォーマット済みで返却(20060102_150405)
func generateTimestamp() string {
	return time.Now().Format("20060102_150405")
}

// プロフィール画像のファイル名を生成
func GenerateProfileAvatarFilename(userID int64) string {
	return fmt.Sprintf("user_%d_avatar_%s.webp", userID, generateTimestamp())
}

// ギャラリー投稿画像のファイル生成
func GenerateGalleryImageFilename(userID int64, index int) string {
	return fmt.Sprintf("user_%d_post_%d_%s.webp", userID, index, generateTimestamp())
}
