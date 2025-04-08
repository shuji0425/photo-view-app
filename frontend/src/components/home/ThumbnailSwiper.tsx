"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

import { PublicPhoto } from "@/types/public/photo";
import type { Swiper as SwiperType } from "swiper";
import { cn } from "@/lib/utils/cn";

type Props = {
  photos: PublicPhoto[];
  onThumbsInit: (swiper: SwiperType) => void;
  activeIndex: number;
  onThumbClick: (index: number) => void;
};

/**
 * サムネイルスワイパー
 */
export const ThumbnailSwiper = ({
  photos,
  onThumbsInit,
  activeIndex,
  onThumbClick,
}: Props) => {
  return (
    <div className="py-1 px-3">
      <Swiper
        onSwiper={onThumbsInit}
        onClick={(swiper) => {
          if (swiper.clickedIndex !== undefined) {
            onThumbClick(swiper.clickedIndex);
          }
        }}
        freeMode
        modules={[FreeMode, Thumbs]}
        watchSlidesProgress
        slideToClickedSlide
        className="w-full"
        spaceBetween={5}
        breakpoints={{
          0: { slidesPerView: 5 },
          640: { slidesPerView: 6 },
          768: { slidesPerView: 8 },
          1024: { slidesPerView: 10 },
          1280: { slidesPerView: 12 },
        }}
      >
        {photos.map((photo, index) => (
          <SwiperSlide key={photo.id} className="cursor-pointer">
            <div
              className={cn(
                "relative aspect-square overflow-hidden rounded transition-all",
                "w-[60px] sm:w-[80px] md:w-[70px] lg:w-[85px] xl:w-[90px]",
                activeIndex === index
                  ? "border-4 border-blue-500"
                  : "border-2 border-transparent"
              )}
            >
              <Image
                src={photo.url}
                alt={photo.title ?? "thumbnail"}
                fill
                sizes="(max-width: 768px) 20vw, 100px"
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
