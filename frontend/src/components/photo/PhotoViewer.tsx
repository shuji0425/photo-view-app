"use client";

import { useState } from "react";
import { PublicPhoto } from "@/types/public/photo";
import PhotoMainView from "./PhotoMainView";
import PhotoThumbnailList from "./PhotoThumbnailList";

type Props = {
  photos: PublicPhoto[];
};

export default function PhotoViewer({ photos }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentPhoto = photos[currentIndex];

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      {/* メイン画像スライド表示 */}
      <PhotoMainView
        photo={currentPhoto}
        onPrev={() =>
          setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length)
        }
        onNext={() => setCurrentIndex((prev) => (prev + 1) % photos.length)}
      />

      {/* サムネイル一覧 */}
      <div className="shrink-0 overflow-x-auto px-2 py-1">
        <PhotoThumbnailList
          photos={photos}
          currentIndex={currentIndex}
          onSelect={(index) => setCurrentIndex(index)}
        />
      </div>
    </div>
  );
}
