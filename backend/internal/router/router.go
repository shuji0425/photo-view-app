package router

import (
	"backend/internal/injector"
	"backend/internal/middleware"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// 構造体
type Router struct {
	Engine *gin.Engine
}

// ルーティング設定
func NewRouter(db *gorm.DB) *Router {
	r := gin.Default()
	r.Use(middleware.CORSMiddleware())
	r.SetTrustedProxies(nil) // プロキシをローカルのみ許可

	// ハンドラーを取得
	handlers := injector.InjectAll(db)

	// ルーティング設定
	SetupProfileRoutes(r, handlers.ProfileHandler)
	SetupAuthRoutes(r, handlers.AuthHandler)
	SetupUserRoutes(r, handlers.UserHandler)
	SetupAvatarRoutes(r, handlers.AvatarHandler)

	return &Router{Engine: r}
}
