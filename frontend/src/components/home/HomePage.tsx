"use client";

import { TagList } from "@/components/home/TagList";
import { useHomePageState } from "@/hooks/home/useHomePageState";
import { CustomSlider } from "./CustomSlider";
import { CustomThumbnail } from "./CustomThumbnail";
import { useSliderController } from "@/hooks/home/useSliderController";
import { useRouter } from "next/navigation";

/**
 * 公開ページ
 */
export const HomePage = () => {
  const router = useRouter();
  const {
    photos,
    selectedTagId,
    handleTagSelect,
    activeIndex,
    setActiveIndex,
  } = useHomePageState();

  const { goToAuto, direction } = useSliderController({
    photos,
    currentIndex: activeIndex,
    onIndexChange: setActiveIndex,
  });

  // サムネイル選択時
  const handleGoTo = (index: number) => {
    if (photos.length === 0) return;

    // ループ対応
    const total = photos.length;
    const normalizedIndex = (index + total) % total;

    goToAuto(normalizedIndex);
    if (selectedTagId !== null) {
      router.replace(
        `/?tag_id=${selectedTagId}&photo_index=${normalizedIndex}`
      );
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* タグリスト */}
      <div className="shrink-0">
        <TagList selectedTagId={selectedTagId} onSelect={handleTagSelect} />
      </div>

      {/* メイン画面 */}
      <div className="flex-1 overflow-hidden">
        <CustomSlider
          photos={photos}
          currentIndex={activeIndex}
          direction={direction}
          onSwipe={handleGoTo}
        />
      </div>

      {/* サムネイル */}
      <div className="shrink-0">
        <CustomThumbnail
          photos={photos}
          activeIndex={activeIndex}
          onThumbClick={handleGoTo}
        />
      </div>
    </div>
  );
};
