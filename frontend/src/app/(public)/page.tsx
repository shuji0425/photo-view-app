"use client";

import { MainSwiper } from "@/components/home/MainSwiper";
import { TagList } from "@/components/home/TagList";
import { ThumbnailSwiper } from "@/components/home/ThumbnailSwiper";
import { Swiper as SwiperType } from "swiper";
import { getTagDefault } from "@/lib/api/tag/getDefault";
import { getPublicPhotosByTagId } from "@/lib/api/tag/getPublicPhotosByTagId";
import { PublicPhoto } from "@/types/public/photo";
import { useEffect, useState } from "react";

/**
 * 公開ページ
 */
export default function HomePage() {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [photos, setPhotos] = useState<PublicPhoto[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

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
    <div className="h-full flex flex-col">
      {/* タグリスト */}
      <div className="shrink-0">
        <TagList />
      </div>

      {/* メイン画面 */}
      <div className="flex-1">
        <MainSwiper
          photos={photos}
          thumbsSwiper={thumbsSwiper}
          onSlideChange={setActiveIndex}
        />
      </div>

      {/* サムネイル */}
      <div className="shrink-0">
        <ThumbnailSwiper
          photos={photos}
          onThumbsInit={setThumbsSwiper}
          activeIndex={activeIndex}
          onThumbClick={setActiveIndex}
        />
      </div>
    </div>
  );
}
