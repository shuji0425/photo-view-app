import { useCallback, useState } from "react";
import { useFileInput } from "./useFileInput";
import { usePreviewManager } from "../usePreviewManager";
import { useCropState } from "./useCropState";

export type Crop = { x: number; y: number };

// 引数
export type UseAvatarUploaderArgs = {
  initialUrl?: string | null;
  onImageSelected: (blob: Blob | null) => void;
  onAvatarDelete?: () => void;
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
  onAvatarDelete,
}: UseAvatarUploaderArgs): UseAvatarUploaderReturn => {
  const [blob, setBlob] = useState<Blob | null>(null);
  const previewManager = usePreviewManager(blob);
  const previewUrl =
    previewManager.mode === "single" ? previewManager.previewUrl : null;

  // 保持用
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const {
    cropImageUrl,
    savedCrop,
    savedZoom,
    setCropImageUrl,
    handleCropComplete: handleCropStateComplete,
    resetCropState,
    handleCancelCrop,
  } = useCropState(onImageSelected);

  const {
    fileInputRef,
    handleAvatarClick,
    handleFileChange: rawFileChange,
  } = useFileInput();

  // ファイル選択後 Cropダイアログ表示＆URLをセット
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const url = rawFileChange(e);
      if (!url) return;
      setOriginalImageUrl(url);
      setCropImageUrl(url);
    },
    [rawFileChange, setCropImageUrl]
  );

  // トリミング完了時
  const handleCropComplete = useCallback(
    (blob: Blob, crop: Crop, zoom: number) => {
      setBlob(blob);
      handleCropStateComplete(blob, crop, zoom);
    },
    [handleCropStateComplete]
  );

  // 再トリミング
  const handleRetrim = useCallback(() => {
    if (originalImageUrl) {
      setCropImageUrl(originalImageUrl);
    }
  }, [originalImageUrl, setCropImageUrl]);

  // アバター初期化
  const handleResetImage = useCallback(() => {
    setBlob(null);
    setOriginalImageUrl(null);
    setCropImageUrl(null);
    onImageSelected(null);
    resetCropState();
    if (onAvatarDelete) onAvatarDelete();
  }, [onImageSelected, setCropImageUrl, resetCropState, onAvatarDelete]);

  return {
    previewUrl: previewUrl ?? initialUrl ?? null,
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
