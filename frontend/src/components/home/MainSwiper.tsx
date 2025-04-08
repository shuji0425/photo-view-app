"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { PublicPhoto } from "@/types/public/photo";
import { getPublicPhotosByTagId } from "@/lib/api/tag/getPublicPhotosByTagId";
import { getTagDefault } from "@/lib/api/tag/getDefault";
import Image from "next/image";
import { useGallerySwiper } from "@/hooks/home/useGallerySwiper";

type Props = {
  gallery: ReturnType<typeof useGallerySwiper>;
};

/**
 * メイン画像スワイパー
 */
export const MainSwiper = ({ gallery }: Props) => {
  const [photos, setPhotos] = useState<PublicPhoto[]>([]);
  const { thumbSwiper } = gallery;

  // 初期データ取得
  useEffect(() => {
    const fetchData = async () => {
      try {
        const defaultTag = await getTagDefault();
        const photosByTag = await getPublicPhotosByTagId(defaultTag.id);
        setPhotos(photosByTag);
      } catch (err) {
        console.error("画像の取得に失敗", err);
      }
    };
    fetchData();
  }, []);

  return (
    <Swiper
      modules={[Navigation, Pagination, Thumbs]}
      navigation
      pagination={{ clickable: true }}
      thumbs={{ swiper: thumbSwiper }}
      className="w-full h-full"
    >
      {photos.map((photo) => (
        <SwiperSlide key={photo.id}>
          <div className="w-full h-full flex items-center justify-center bg-black relative">
            <Image
              src={photo.url}
              alt={photo.title ?? "photo"}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
