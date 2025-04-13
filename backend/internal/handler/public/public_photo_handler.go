package handler

import (
	"backend/internal/usecase"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// 構造体
type PublicPhotoHandler struct {
	photoTagUsecase usecase.PhotoTagUsecase
	photoUsecase    usecase.PhotoUsecase
}

// 依存注入用
func NewPublicPhotoHandler(photoTagUsecase usecase.PhotoTagUsecase, photoUsecase usecase.PhotoUsecase) *PublicPhotoHandler {
	return &PublicPhotoHandler{photoTagUsecase, photoUsecase}
}

// デフォルトタグを1件取得
func (h *PublicPhotoHandler) GetPhotosByTag(c *gin.Context) {
	tagIDStr := c.Param("tag_id")
	tagID, err := strconv.ParseInt(tagIDStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "不正なタグIDです"})
		return
	}

	photos, err := h.photoTagUsecase.GetPhotosByTagIDForPublic(c.Request.Context(), tagID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "取得に失敗しました"})
		return
	}

	c.JSON(http.StatusOK, photos)
}

// 写真情報と詳細を取得
func (h *PublicPhotoHandler) GetPhotoDetail(c *gin.Context) {
	idParam := c.Param("photo_id")
	id, err := strconv.ParseInt(idParam, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "不正なidです"})
		return
	}

	detail, err := h.photoUsecase.GetPublicPhotoDetail(c.Request.Context(), id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "取得に失敗しました"})
		return
	}
	if detail == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "見つかりませんでした"})
		return
	}

	c.JSON(http.StatusOK, detail)
}

// 写真IDの配列を取得
func (h *PublicPhotoHandler) GetPublicPhotoIDs(c *gin.Context) {
	ids, err := h.photoUsecase.GetPublicPhotoIDs(c.Request.Context())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "取得に失敗しました"})
		return
	}
	type response struct {
		ID int64 `json:"id"`
	}

	result := make([]response, len(ids))
	for i, id := range ids {
		result[i] = response{ID: id}
	}

	c.JSON(http.StatusOK, result)
}
