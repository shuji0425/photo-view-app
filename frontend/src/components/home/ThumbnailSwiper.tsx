"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

import { getPublicPhotosByTagId } from "@/lib/api/tag/getPublicPhotosByTagId";
import { getTagDefault } from "@/lib/api/tag/getDefault";
import { PublicPhoto } from "@/types/public/photo";
import { useGallerySwiper } from "@/hooks/home/useGallerySwiper";

type Props = {
  gallery: ReturnType<typeof useGallerySwiper>;
};

/**
 * サムネイルスワイパー
 */
export const ThumbnailSwiper = ({ gallery }: Props) => {
  const [photos, setPhotos] = useState<PublicPhoto[]>([]);
  const { setThumbSwiper } = gallery;

  // 初期の取得
  useEffect(() => {
    const fetchData = async () => {
      try {
        const defaultTag = await getTagDefault();
        const photosByTag = await getPublicPhotosByTagId(defaultTag.id);
        setPhotos(photosByTag);
      } catch (err) {
        console.error("取得に失敗しました", err);
      }
    };
    fetchData();
  }, []);

  return (
    <Swiper
      onSwiper={setThumbSwiper}
      slidesPerView={6}
      spaceBetween={8}
      freeMode
      modules={[FreeMode, Thumbs]}
      watchSlidesProgress
      className="w-full px-4 py-2"
    >
      {photos.map((photo) => (
        <SwiperSlide key={photo.id} className="cursor-pointer">
          <div className="relative w-full aspect-square rounded overflow-hidden">
            <Image
              src={photo.url}
              alt={photo.title ?? "thumbnail"}
              fill
              sizes="(max-width: 768px) 15vw, 100px"
              className="object-cover"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
