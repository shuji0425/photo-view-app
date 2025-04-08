import { useState } from "react";
import { Swiper as SwiperType } from "swiper";

/**
 * Swiperインスタンスを共有し、メイン・サムネイルを連携させるフック
 */
export const useGallerySwiper = () => {
  const [thumbSwiper, setThumbSwiper] = useState<SwiperType | null>(null);

  return { thumbSwiper, setThumbSwiper };
};
