"use client";

import { MainSwiper } from "@/components/home/MainSwiper";
import { TagList } from "@/components/home/TagList";
import { ThumbnailSwiper } from "@/components/home/ThumbnailSwiper";
import { useGallerySwiper } from "@/hooks/home/useGallerySwiper";

/**
 * 公開ページ
 */
export default function HomePage() {
  const gallery = useGallerySwiper();

  return (
    <div className="h-full flex flex-col">
      {/* タグリスト */}
      <div className="shrink-0">
        <TagList />
      </div>

      {/* メイン画面 */}
      <div className="flex-1">
        <MainSwiper gallery={gallery} />
      </div>

      {/* サムネイル */}
      <div className="shrink-0">
        <ThumbnailSwiper gallery={gallery} />
      </div>
    </div>
  );
}
