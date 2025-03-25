package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

func LoadEnv() {
	// 本番環境では.envを使用しない
	if os.Getenv("GO_ENV") == "production" {
		log.Println("本番環境のため .env は読み込みません")
		return
	}

	// 開発環境: .envを読み込む
	err := godotenv.Load()
	if err != nil {
		log.Println(".envの読み込みに失敗しました。環境変数は直接読み込まれます。")
	}
}
