package router

import (
	"backend/internal/middleware"

	"github.com/gin-gonic/gin"
)

// 構造体
type Router struct {
	Engine *gin.Engine
}

// ルーティング設定
func NewRouter(adminHandlers *AdminHandlers, publicHandlers *PublicHandlers) *Router {
	r := gin.Default()
	r.Use(middleware.CORSMiddleware())
	r.SetTrustedProxies(nil) // プロキシをローカルのみ許可

	// APIバージョン管理
	api := r.Group("/api/v1")

	// === 公開用API ===
	public := api.Group("/public")
	SetupPublicRoutes(
		public,
		publicHandlers.PublicProfileHandler,
		publicHandlers.PublicTagHandler,
		publicHandlers.PublicPhotoHandler,
	)

	// === 認証API ===
	auth := api.Group("/auth")
	SetupAuthRoutes(auth, adminHandlers.AuthHandler)

	// === 管理者専用API ===
	admin := api.Group("/admin")
	admin.Use(middleware.AuthMiddleware())
	SetupProfileRoutes(admin, adminHandlers.ProfileHandler)
	SetupUserRoutes(admin, adminHandlers.UserHandler)
	SetupAvatarRoutes(admin, adminHandlers.AvatarHandler)
	SetupPhotoRoutes(admin, adminHandlers.PhotoHandler)
	SetupCategoryRoutes(admin, adminHandlers.CategoryHandler)
	SetupTagRoutes(admin, adminHandlers.TagHandler, adminHandlers.PhotoTagHandler)
	SetupMetadataPolicyRoutes(admin, adminHandlers.MetadataPolicyHandler)

	return &Router{Engine: r}
}
