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
  const [selectedTagId, setSelectedTagId] = useState<number | null>(null);
  const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);

  // 初期の取得
  useEffect(() => {
    const fetchData = async () => {
      try {
        const defaultTag = await getTagDefault();
        setSelectedTagId(defaultTag.id);
      } catch (err) {
        console.error("取得に失敗しました", err);
      }
    };
    fetchData();
  }, []);

  // タグ変更時の写真取得
  useEffect(() => {
    const fetchPhotos = async () => {
      if (!selectedTagId) return;
      try {
        const photosByTag = await getPublicPhotosByTagId(selectedTagId);
        setPhotos(photosByTag);
        setActiveIndex(0);
        mainSwiper?.slideTo(0);
      } catch (err) {
        console.error("取得に失敗しました", err);
      }
    };
    fetchPhotos();
  }, [selectedTagId, mainSwiper]);

  return (
    <div className="h-full flex flex-col">
      {/* タグリスト */}
      <div className="shrink-0">
        <TagList selectedTagId={selectedTagId} onSelect={setSelectedTagId} />
      </div>

      {/* メイン画面 */}
      <div className="flex-1">
        <MainSwiper
          photos={photos}
          thumbsSwiper={thumbsSwiper}
          onSlideChange={setActiveIndex}
          onInit={setMainSwiper}
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
