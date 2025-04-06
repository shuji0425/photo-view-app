import { useCallback, useState } from "react";

export type Crop = { x: number; y: number };

export type UseCropStateResult = {
  cropImageUrl: string | null;
  savedCrop: Crop;
  savedZoom: number;
  setCropImageUrl: (url: string | null) => void;
  handleCropComplete: (blob: Blob, crop: Crop, zoom: number) => void;
  resetCropState: () => void;
  handleCancelCrop: () => void;
};

export const useCropState = (
  onImageSelected: (blob: Blob | null) => void
): UseCropStateResult => {
  const [cropImageUrl, setCropImageUrl] = useState<string | null>(null);
  const [savedCrop, setSavedCrop] = useState<Crop>({ x: 0, y: 0 });
  const [savedZoom, setSavedZoom] = useState<number>(1);

  // トリミング完了後（プレビュー更新、モーダル閉じる、blob渡す）
  const handleCropComplete = useCallback(
    (blob: Blob, crop: Crop, zoom: number) => {
      onImageSelected(blob);
      setCropImageUrl(null);
      setSavedCrop(crop);
      setSavedZoom(zoom);
    },
    [onImageSelected]
  );

  // アバター画像削除
  const handleCancelCrop = useCallback(() => {
    setCropImageUrl(null);
    onImageSelected(null);
  }, [onImageSelected]);

  const resetCropState = useCallback(() => {
    setCropImageUrl(null);
    setSavedCrop({ x: 0, y: 0 });
    setSavedZoom(1);
  }, []);

  return {
    cropImageUrl,
    savedCrop,
    savedZoom,
    setCropImageUrl,
    handleCropComplete,
    resetCropState,
    handleCancelCrop,
  };
};
