package main

import (
	"backend/internal/config"
	"backend/internal/infrastructure"
	"backend/internal/injector"
	"backend/internal/router"
	"log"
)

func main() {
	config.LoadEnv()

	db, err := config.ConnectDB()
	if err != nil {
		log.Fatal("DB接続に失敗:", err)
	}

	// インフラ構築
	imageSaver := infrastructure.NewImageSaver("../frontend/public")
	usecases := injector.InjectAll(db, imageSaver)
	adminHandlers := router.NewAdminHandlers(usecases)
	publicHandlers := router.NewPublicHandlers(usecases)

	// ルーター起動
	r := router.NewRouter(adminHandlers, publicHandlers)

	port := ":8800"
	r.Engine.Run(port)
}
