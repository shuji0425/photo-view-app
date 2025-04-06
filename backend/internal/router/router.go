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

	// APIバージョン管理
	api := r.Group("/api/v1")

	// === 公開用API ===
	public := api.Group("/public")
	SetupPublicRoutes(public, handlers.PublicProfileHandler)

	// === 認証API ===
	auth := api.Group("/auth")
	SetupAuthRoutes(auth, handlers.AuthHandler)

	// === 管理者専用API ===
	admin := api.Group("/admin")
	admin.Use(middleware.AuthMiddleware())
	SetupProfileRoutes(admin, handlers.ProfileHandler)
	SetupUserRoutes(admin, handlers.UserHandler)
	SetupAvatarRoutes(admin, handlers.AvatarHandler)
	SetupPhotoRoutes(admin, handlers.PhotoHandler)
	SetupCategoryRoutes(admin, handlers.CategoryHandler)
	SetupTagRoutes(admin, handlers.TagHandler, handlers.PhotoTagHandler)

	return &Router{Engine: r}
}
