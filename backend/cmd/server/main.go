package main

import (
	"backend/internal/config"

	"github.com/gin-gonic/gin"
)

func main() {
	config.LoadEnv()
	r := gin.Default()

	r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{"message": "welcome"})
	})

	r.Run(":8888")
}
