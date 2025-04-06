"use client";

import Image from "next/image";
import { AvatarCropDialog } from "./AvatarCropDialog";
import { useAvatarUploader } from "@/hooks/profile/useAvatarUploader";

type AvatarUploaderProps = {
  initialUrl?: string | null;
  onImageSelected: (blob: Blob | null) => void;
  onAvatarDelete?: () => void;
};

/**
 * プロフィール画像
 * トリミング＆リサイズ
 */
export default function AvatarUploader({
  initialUrl,
  onImageSelected,
  onAvatarDelete,
}: AvatarUploaderProps) {
  const {
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
  } = useAvatarUploader({ onImageSelected, initialUrl, onAvatarDelete });

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
            onClick={handleResetImage}
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
          onCancel={handleCancelCrop}
          initialCrop={savedCrop}
          initialZoom={savedZoom}
          rounded
        />
      )}
    </div>
  );
}
