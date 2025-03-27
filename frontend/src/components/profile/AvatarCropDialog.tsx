"use client";

import Cropper, { Area } from "react-easy-crop";
import { useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { getCroppedImage } from "@/lib/utils/cropImage";

type Props = {
  imageUrl: string;
  onComplete: (
    blob: Blob,
    crop: { x: number; y: number },
    zoom: number
  ) => void;
  onCancel: () => void;
  rounded?: boolean;
  initialCrop?: { x: number; y: number };
  initialZoom?: number;
};

/**
 * 画像トリミング用モーダル
 * @returns ReactPortal
 */
export function AvatarCropDialog({
  imageUrl,
  onComplete,
  onCancel,
  rounded = false,
  initialCrop = { x: 0, y: 0 },
  initialZoom = 1,
}: Props) {
  const [crop, setCrop] = useState(initialCrop);
  const [zoom, setZoom] = useState(initialZoom);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  // トリミング範囲確定時の処理
  const onCropComplete = useCallback((_: Area, areaPixels: Area) => {
    setCroppedAreaPixels(areaPixels);
  }, []);

  // 「決定」押下時の処理
  const handleCrop = async () => {
    if (!croppedAreaPixels) return;
    try {
      const blob = await getCroppedImage(imageUrl, croppedAreaPixels);
      onComplete(blob, crop, zoom);
    } catch (err) {
      console.error("トリミングに失敗しました", err);
    }
  };

  return createPortal(
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4">
        {/* トリミングエリア */}
        <div className="relative w-full h-64 bg-gray-100">
          <Cropper
            image={imageUrl}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            cropShape={rounded ? "round" : "rect"}
            showGrid={false}
          />
        </div>

        {/* ズームスライダー */}
        <input
          type="range"
          min={1}
          max={3}
          step={0.1}
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
          className="w-full"
        />

        {/* 操作ボタン */}
        <div className="flex justify-between aspect-x-2">
          <button onClick={onCancel} className="px-4 py-2 border rounded">
            キャンセル
          </button>
          <button
            onClick={handleCrop}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            決定
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
