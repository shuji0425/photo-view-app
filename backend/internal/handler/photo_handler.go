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
func (h *PhotoHandler) GetPhotoByIDs(c *gin.Context) {
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

	// ユースケースの呼び出し
	res, err := h.photoUsecase.UploadPhotos(userID, files)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// 成功
	c.JSON(http.StatusOK, res)
}
