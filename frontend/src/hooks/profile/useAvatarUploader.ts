import { useCallback, useRef, useState } from "react";

// 引数
export type UseAvatarUploaderArgs = {
  initialUrl?: string | null;
  onImageSelected: (blob: Blob | null) => void;
};

// 戻り値
export type UseAvatarUploaderReturn = {
  previewUrl: string | null;
  cropImageUrl: string | null;
  originalImageUrl: string | null;
  savedCrop: { x: number; y: number };
  savedZoom: number;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleAvatarClick: () => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCropComplete: (
    blob: Blob,
    crop: { x: number; y: number },
    zoom: number
  ) => void;
  handleRetrim: () => void;
  handleCancelCrop: () => void;
  handleResetImage: () => void;
};

/**
 * アバター画像アップロード・トリミング・プレビューを管理するカスタムフック
 */
export const useAvatarUploader = ({
  onImageSelected,
  initialUrl,
}: UseAvatarUploaderArgs): UseAvatarUploaderReturn => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialUrl ?? null
  );
  const [cropImageUrl, setCropImageUrl] = useState<string | null>(null);
  // 保持用
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [savedCrop, setSavedCrop] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [savedZoom, setSavedZoom] = useState<number>(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // アイコン押下ファイル選択
  const handleAvatarClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  // ファイル選択後 Cropダイアログ表示＆URLをセット
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // ファイル取得
      const file = e.target.files?.[0];
      if (!file) return;
      // 表示用URL作成
      const objectUrl = URL.createObjectURL(file);
      setOriginalImageUrl(objectUrl);
      setCropImageUrl(objectUrl);
    },
    []
  );

  // トリミング完了後（プレビュー更新、モーダル閉じる、blob渡す）
  const handleCropComplete = useCallback(
    (blob: Blob, crop: { x: number; y: number }, zoom: number) => {
      const preview = URL.createObjectURL(blob);
      setPreviewUrl(preview);
      onImageSelected(blob);
      setSavedCrop(crop);
      setSavedZoom(zoom);
      setCropImageUrl(null);
    },
    [onImageSelected]
  );

  // トリミング修正
  const handleRetrim = useCallback(() => {
    if (originalImageUrl) {
      setCropImageUrl(originalImageUrl);
    }
  }, [originalImageUrl]);

  // 画像取りやめ
  const handleCancelCrop = useCallback(() => {
    setCropImageUrl(null);
  }, []);

  // アバター画像削除
  const handleResetImage = useCallback(() => {
    setPreviewUrl(null);
    setOriginalImageUrl(null);
    setCropImageUrl(null);
    setSavedCrop({ x: 0, y: 0 });
    setSavedZoom(1);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onImageSelected(null);
  }, [onImageSelected]);

  return {
    previewUrl,
    cropImageUrl,
    originalImageUrl,
    savedCrop,
    savedZoom,
    fileInputRef,
    handleAvatarClick,
    handleFileChange,
    handleCropComplete,
    handleRetrim,
    handleCancelCrop,
    handleResetImage,
  };
};
