package middleware

import (
	"strconv"

	"github.com/gin-gonic/gin"
)

// キャッシュ設定ヘルパー
func SetCache(c *gin.Context, seconds int) {
	c.Header("Cache-Control", "public, max-age="+strconv.Itoa(seconds))
}
