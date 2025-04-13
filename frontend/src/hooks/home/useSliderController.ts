import { PublicPhoto } from "@/types/public/photo";
import { useCallback, useState } from "react";

type Direction = "left" | "right";

type Props = {
  photos: PublicPhoto[];
  currentIndex: number;
  onIndexChange?: (index: number) => void;
};

/**
 * スライダーの制御
 */
export const useSliderController = ({
  photos,
  currentIndex,
  onIndexChange,
}: Props) => {
  const [direction, setDirection] = useState<Direction>("right");

  // 指定インデックス＋方向でスライド
  const goTo = useCallback(
    (nextIndex: number, dir: Direction) => {
      setDirection(dir);
      onIndexChange?.(nextIndex);
    },
    [onIndexChange]
  );

  // 自動で方向を判定
  const goToAuto = useCallback(
    (nextIndex: number) => {
      if (photos.length === 0) return;

      // ループ対応
      const total = photos.length;
      const normalizedIndex = (nextIndex + total) % total;

      const dir: Direction = normalizedIndex > currentIndex ? "left" : "right";
      goTo(normalizedIndex, dir);
    },
    [currentIndex, goTo, photos.length]
  );

  return { displayIndex: currentIndex, direction, goTo, goToAuto };
};
