package handler

import (
	"backend/internal/converter"
	"backend/internal/dto"
	"backend/internal/usecase"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// 構造体
type PhotoTagHandler struct {
	photoTagUsecase usecase.PhotoTagUsecase
}

// 依存注入用
func NewPhotoTagHandler(photoTagUsecase usecase.PhotoTagUsecase) *PhotoTagHandler {
	return &PhotoTagHandler{photoTagUsecase}
}

// 指定タグに紐づく写真を並び順つきで取得
func (h *PhotoTagHandler) GetPhotosByTagID(c *gin.Context) {
	tagIDstr := c.Param("tag_id")
	tagID, err := strconv.ParseInt(tagIDstr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "無効なタグIDです"})
		return
	}

	photos, err := h.photoTagUsecase.GetPhotosByTagID(c.Request.Context(), tagID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "写真の取得に失敗しました"})
		return
	}

	c.JSON(http.StatusOK, photos)
}

// 並び順を更新
func (h *PhotoTagHandler) UpdateSortOrders(c *gin.Context) {
	tagIDStr := c.Param("tag_id")
	tagID, err := strconv.ParseInt(tagIDStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "無効なタグIDです"})
		return
	}

	var req []dto.PhotoTagSortUpdate
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "送信形式が違います"})
	}

	// domainへ変換
	domainUpdates := converter.ToDomainPhotoTagSort(req)

	if err := h.photoTagUsecase.UpdateSortOrders(c.Request.Context(), tagID, domainUpdates); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "更新に失敗しました"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "更新に成功しました"})
}
