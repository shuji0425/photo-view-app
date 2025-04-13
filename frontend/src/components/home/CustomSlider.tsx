"use client";

import { useSwipeable } from "react-swipeable";
import { PublicPhoto } from "@/types/public/photo";
import { AnimatePresence } from "framer-motion";
import { SliderMotionItem } from "./SliderMotionItem";

type Direction = "left" | "right";

type Props = {
  photos: PublicPhoto[];
  currentIndex: number;
  direction: Direction;
  onSwipe: (index: number) => void;
};

/**
 * メインスライダー
 */
export const CustomSlider = ({
  photos,
  currentIndex,
  direction,
  onSwipe,
}: Props) => {
  // スライド方向の制御
  const handlers = useSwipeable({
    onSwipedLeft: () => onSwipe(currentIndex + 1),
    onSwipedRight: () => onSwipe(currentIndex - 1),
    trackMouse: true,
    trackTouch: true,
    preventScrollOnSwipe: true,
  });

  const currentPhoto = photos[currentIndex];
  if (!currentPhoto) return null;

  return (
    <div
      {...handlers}
      className="w-full h-full flex items-center justify-center bg-black relative touch-pan-y"
    >
      <AnimatePresence custom={direction} mode="wait">
        <SliderMotionItem
          photo={currentPhoto}
          direction={direction}
          currentIndex={currentIndex}
        />
      </AnimatePresence>
    </div>
  );
};
