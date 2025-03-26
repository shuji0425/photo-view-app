package main

import (
	"backend/internal/config"
	"backend/internal/router"
	"log"
)

func main() {
	config.LoadEnv()

	db, err := config.ConnectDB()
	if err != nil {
		log.Fatal("DB接続に失敗:", err)
	}

	// ルーター起動
	r := router.NewRouter(db)

	port := ":8800"
	r.Engine.Run(port)
}
