"use client";

import { useSwipeable } from "react-swipeable";
import { PublicPhoto } from "@/types/public/photo";
import { FlipCard } from "./FlipCard";

type Props = {
  photos: PublicPhoto[];
  currentIndex: number;
  onIndexChange?: (index: number) => void;
};

/**
 * メインスライダー
 */
export const CustomSlider = ({
  photos,
  currentIndex,
  onIndexChange,
}: Props) => {
  // スライド時に何番目をみているか確認
  const goTo = (index: number) => {
    const newIndex = (index + photos.length) % photos.length;
    onIndexChange?.(newIndex);
  };

  // スライド方向の制御
  const handlers = useSwipeable({
    onSwipedLeft: () => goTo(currentIndex + 1),
    onSwipedRight: () => goTo(currentIndex - 1),
    trackMouse: true,
  });

  const currentPhoto = photos[currentIndex];

  if (!currentPhoto) return null;

  return (
    <div
      {...handlers}
      className="w-full h-full flex items-center justify-center bg-black relative touch-pan-y"
    >
      <FlipCard photo={currentPhoto} isFirst={currentIndex === 0} />
    </div>
  );
};
