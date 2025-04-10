"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { PublicPhoto } from "@/types/public/photo";
import type { Swiper as SwiperType } from "swiper";
import { FlipCard } from "./FlipCard";

type Props = {
  photos: PublicPhoto[];
  thumbsSwiper: SwiperType | null;
  onSlideChange: (index: number) => void;
  onInit?: (swiper: SwiperType) => void;
};

/**
 * メイン画像スワイパー
 */
export const MainSwiper = ({
  photos,
  thumbsSwiper,
  onSlideChange,
  onInit,
}: Props) => {
  return (
    <Swiper
      onSlideChange={(swiper) => {
        onSlideChange(swiper.realIndex);
      }}
      onSwiper={onInit}
      modules={[Thumbs]}
      thumbs={{ swiper: thumbsSwiper }}
      touchRatio={1.5}
      resistanceRatio={0.85}
      speed={450}
      className="w-full h-full"
    >
      {photos.map((photo) => (
        <SwiperSlide key={photo.id}>
          <div className="w-full h-full flex items-center justify-center bg-black relative">
            <FlipCard photo={photo} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
