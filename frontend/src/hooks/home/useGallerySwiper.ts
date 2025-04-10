import { useState } from "react";
import { Swiper as SwiperType } from "swiper";

/**
 * Swiperインスタンスを共有し、メイン・サムネイルを連携させるフック
 */
export const useGallerySwiper = () => {
  const [thumbSwiper, setThumbSwiper] = useState<SwiperType | null>(null);
  const [isReady, setIsReady] = useState(false);

  const handleSetThumbSwiper = (swiper: SwiperType) => {
    if (swiper && !swiper.destroyed) {
      setThumbSwiper(swiper);
      setIsReady(true);
    }
  };

  return {
    thumbSwiper,
    setThumbSwiper: handleSetThumbSwiper,
    isThumbReady: isReady,
  };
};
