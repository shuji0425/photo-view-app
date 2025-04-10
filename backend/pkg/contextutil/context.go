package contextutil

import (
	"errors"

	"github.com/gin-gonic/gin"
)

var ErrUserIDNotFound = errors.New("userID not found in context")
var ErrUserIDTypeFailed = errors.New("userID type assertion failed")

// Gin の Context から userIDを取得
func GetUserID(c *gin.Context) (int64, error) {
	userIDRaw, exists := c.Get("userID")
	if !exists {
		return 0, ErrUserIDNotFound
	}

	userID, ok := userIDRaw.(int64)
	if !ok {
		return 0, ErrUserIDTypeFailed
	}

	return userID, nil
}
