package main

import (
	"backend/internal/config"
	"backend/internal/router"
	"log"
	"net/http"
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
	if err := http.ListenAndServe(port, r); err != nil {
		log.Fatal(err)
	}
}
