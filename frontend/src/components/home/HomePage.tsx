"use client";

import { TagList } from "@/components/home/TagList";
import { useHomePageState } from "@/hooks/home/useHomePageState";
import { CustomSlider } from "./CustomSlider";
import { CustomThumbnail } from "./CustomThumbnail";

/**
 * 公開ページ
 */
export const HomePage = () => {
  const {
    // thumbsSwiper,
    // setThumbsSwiper,
    // setMainSwiper,
    photos,
    selectedTagId,
    handleTagSelect,
    activeIndex,
    setActiveIndex,
    // handleThumbClick,
  } = useHomePageState();

  return (
    <div className="h-full flex flex-col">
      {/* タグリスト */}
      <div className="shrink-0">
        <TagList selectedTagId={selectedTagId} onSelect={handleTagSelect} />
      </div>

      {/* メイン画面 */}
      <div className="flex-1">
        <CustomSlider
          photos={photos}
          currentIndex={activeIndex}
          onIndexChange={setActiveIndex}
        />
      </div>

      {/* サムネイル */}
      <div className="shrink-0">
        <CustomThumbnail
          photos={photos}
          activeIndex={activeIndex}
          onThumbClick={setActiveIndex}
        />
      </div>
    </div>
  );
};
