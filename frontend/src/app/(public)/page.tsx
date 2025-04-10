"use client";

import { MainSwiper } from "@/components/home/MainSwiper";
import { TagList } from "@/components/home/TagList";
import { ThumbnailSwiper } from "@/components/home/ThumbnailSwiper";
import { useHomePageState } from "@/hooks/home/useHomePageState";

/**
 * 公開ページ
 */
export default function HomePage() {
  const {
    thumbsSwiper,
    setThumbsSwiper,
    setMainSwiper,
    photos,
    selectedTagId,
    handleTagSelect,
    activeIndex,
    setActiveIndex,
    handleThumbClick,
  } = useHomePageState();

  return (
    <div className="h-full flex flex-col">
      {/* タグリスト */}
      <div className="shrink-0">
        <TagList selectedTagId={selectedTagId} onSelect={handleTagSelect} />
      </div>

      {/* メイン画面 */}
      <div className="flex-1">
        <MainSwiper
          photos={photos}
          thumbsSwiper={thumbsSwiper}
          onSlideChange={setActiveIndex}
          onInit={setMainSwiper}
        />
      </div>

      {/* サムネイル */}
      <div className="shrink-0">
        <ThumbnailSwiper
          photos={photos}
          onThumbsInit={setThumbsSwiper}
          activeIndex={activeIndex}
          onThumbClick={handleThumbClick}
        />
      </div>
    </div>
  );
}
