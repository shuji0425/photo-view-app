package handler

import (
	"backend/internal/usecase"
	"net/http"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
)

// 構造体
type PhotoHandler struct {
	photoUsecase usecase.PhotoUsecase
}

// 依存注入用
func NewPhotoHandler(photoUsecase usecase.PhotoUsecase) *PhotoHandler {
	return &PhotoHandler{photoUsecase}
}

// id配列から画像情報を取得
func (h *PhotoHandler) GetPhotosByIDs(c *gin.Context) {
	idsParam := c.Query("ids")
	if idsParam == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "パラメータが必要です"})
		return
	}

	// クエリパラメータのidを配列に入れる
	idStrs := strings.Split(idsParam, ",")
	var ids []int64
	for _, s := range idStrs {
		if id, err := strconv.ParseInt(s, 10, 64); err == nil {
			ids = append(ids, id)
		}
	}

	// idがあるかチェック
	if len(ids) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "有効なIDがありません"})
		return
	}

	photos, err := h.photoUsecase.GetPhotoByIDs(ids)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "取得に失敗しました"})
		return
	}

	c.JSON(http.StatusOK, photos)
}

// ページネーション対応の画像一覧を返す
func (h *PhotoHandler) GetPaginatedPhotos(c *gin.Context) {
	pageParam := c.DefaultQuery("page", "1")
	limitParam := c.DefaultQuery("limit", "30")

	page, err := strconv.Atoi(pageParam)
	if err != nil || page <= 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "pageは1以上の整数で指定してください"})
		return
	}

	limit, err := strconv.Atoi(limitParam)
	if err != nil || limit <= 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "limitは1以上の整数で指定してください"})
		return
	}

	photos, err := h.photoUsecase.GetPaginatedPhotos(page, limit)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "画像一覧の取得に失敗しました"})
		return
	}

	c.JSON(http.StatusOK, photos)
}

// 写真をアップロードしてDBに必須情報を保存
func (h *PhotoHandler) UploadPhotos(c *gin.Context) {
	// URLからパラメータを取得
	userID, err := strconv.ParseInt(c.Param("user_id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ユーザーIDを取得できませんでした"})
		return
	}

	// ファイルを取得
	form, err := c.MultipartForm()
	if err != nil || form.File["images"] == nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "画像が見つかりません"})
		return
	}
	files := form.File["images"]

	// コンテキストを取得
	ctx := c.Request.Context()

	// ユースケースの呼び出し
	res, err := h.photoUsecase.UploadPhotos(ctx, userID, files)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// 成功
	c.JSON(http.StatusOK, res)
}

// 写真と写真情報を削除
func (h *PhotoHandler) DeletePhotosByIDs(c *gin.Context) {
	var req struct {
		IDs []int64 `json:"ids"`
	}

	if err := c.ShouldBindJSON(&req); err != nil || len(req.IDs) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "削除対象がありません"})
		return
	}

	if err := h.photoUsecase.DeletePhotosByIDs(req.IDs); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "削除に失敗しました"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "削除しました"})
}
