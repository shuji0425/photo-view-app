"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { AvatarCropDialog } from "./AvatarCropDialog";

type AvatarUploaderProps = {
  initialUrl?: string | null;
  onImageSelected: (blob: Blob | null) => void;
};

/**
 * プロフィール画像
 * トリミング＆リサイズ
 */
export default function AvatarUploader({
  initialUrl,
  onImageSelected,
}: AvatarUploaderProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialUrl ?? null
  );
  const [cropImageUrl, setCropImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  // 保持用
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [savedCrop, setSavedCrop] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [savedZoom, setSavedZoom] = useState<number>(1);

  // アイコン押下ファイル選択
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  // ファイル選択後 Cropダイアログ表示＆URLをセット
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // ファイル取得
    const file = e.target.files?.[0];
    if (!file) return;
    // 表示用URL作成
    const objectUrl = URL.createObjectURL(file);
    setOriginalImageUrl(objectUrl);
    setCropImageUrl(objectUrl);
  };

  // トリミング完了後（プレビュー更新、モーダル閉じる、blob渡す）
  const handleCropComplete = (
    blob: Blob,
    crop: { x: number; y: number },
    zoom: number
  ) => {
    const preview = URL.createObjectURL(blob);
    setPreviewUrl(preview);
    onImageSelected(blob);
    setSavedCrop(crop);
    setSavedZoom(zoom);
    setCropImageUrl(null);
  };

  // トリミング修正
  const handleRetrim = () => {
    if (originalImageUrl) {
      setCropImageUrl(originalImageUrl);
    }
  };

  // 画像登録をやめる
  const handleCancelImage = () => {
    setPreviewUrl(null);
    setOriginalImageUrl(null);
    onImageSelected(null);
  };

  return (
    <div className="w-full flex flex-col justify-center mt-1">
      {/* プレビュー表示 */}
      <div
        onClick={handleAvatarClick}
        className="w-24 h-24 relative rounded-full overflow-hidden border cursor-pointer"
      >
        <Image
          src={previewUrl ?? "/default-avatar.webp"}
          alt="プロフィール画像"
          fill
          className="object-cover"
          priority
          sizes="96px"
        />
      </div>

      {/* 画像選択(非表示) */}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        className="hidden"
      />

      {/* 画像取りやめボタン */}
      {previewUrl && (
        <div className="flex justify-between text-sm text-gray-600">
          {originalImageUrl ? (
            <button
              type="button"
              onClick={handleRetrim}
              className="text-blue-500 underline cursor-pointer"
            >
              トリミング修正
            </button>
          ) : (
            <span className="text-gray-400 italic">再アップロード可能</span>
          )}
          <button
            type="button"
            onClick={handleCancelImage}
            className="text-red-500 underline cursor-pointer"
          >
            画像を削除
          </button>
        </div>
      )}

      {/* トリミングモーダル */}
      {cropImageUrl && (
        <AvatarCropDialog
          imageUrl={cropImageUrl}
          onComplete={handleCropComplete}
          onCancel={() => setCropImageUrl(null)}
          initialCrop={savedCrop}
          initialZoom={savedZoom}
          rounded
        />
      )}
    </div>
  );
}
