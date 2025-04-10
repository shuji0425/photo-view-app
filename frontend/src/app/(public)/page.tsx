"use client";

import { MainSwiper } from "@/components/home/MainSwiper";
import { TagList } from "@/components/home/TagList";
import { ThumbnailSwiper } from "@/components/home/ThumbnailSwiper";
import { Swiper as SwiperType } from "swiper";
import { getTagDefault } from "@/lib/api/tag/getDefault";
import { getPublicPhotosByTagId } from "@/lib/api/tag/getPublicPhotosByTagId";
import { PublicPhoto } from "@/types/public/photo";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

/**
 * 公開ページ
 */
export default function HomePage() {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [photos, setPhotos] = useState<PublicPhoto[]>([]);
  const [selectedTagId, setSelectedTagId] = useState<number | null>(null);
  const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const tagIdFromQuery = searchParams.get("tag_id");
  const photoIndexFromQuery = searchParams.get("photo_index");
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // 初期の取得
  useEffect(() => {
    const init = async () => {
      if (tagIdFromQuery) {
        setSelectedTagId(Number(tagIdFromQuery));
      } else {
        try {
          const defaultTag = await getTagDefault();
          setSelectedTagId(defaultTag.id);
          router.replace(`/?tag_id=${defaultTag.id}&photo_index=0`);
        } catch (err) {
          console.error("取得に失敗しました", err);
        }
      }
    };
    init();
  }, [router, tagIdFromQuery]);

  // 写真取得
  useEffect(() => {
    const fetchPhotos = async () => {
      if (!selectedTagId) return;
      try {
        const photosByTag = await getPublicPhotosByTagId(selectedTagId);
        setPhotos(photosByTag);
      } catch (err) {
        console.error("取得に失敗しました", err);
      }
    };
    fetchPhotos();
  }, [selectedTagId]);

  // indexをセット（写真更新後）
  useEffect(() => {
    const index = photoIndexFromQuery ? Number(photoIndexFromQuery) : 0;
    setActiveIndex(index);
    if (mainSwiper && photos.length > 0) {
      mainSwiper?.slideTo(index);
    }
  }, [photos.length, photoIndexFromQuery, mainSwiper]);

  // タグ選択後にURLに反映
  const handleTagSelect = (tagId: number) => {
    setSelectedTagId(tagId);
    setActiveIndex(0);
    router.replace(`/?tag_id=${tagId}&photo_index=0`);
  };

  // サムネイル選択時
  const handleThumbClick = (index: number) => {
    setActiveIndex(index);
    mainSwiper?.slideTo(index);
    if (selectedTagId) {
      router.replace(`/?tag_id=${selectedTagId}&photo_index=${index}`);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* タグリスト */}
      <div className="shrink-0">
        <TagList selectedTagId={selectedTagId} onSelect={handleTagSelect} />
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
          onThumbClick={handleThumbClick}
        />
      </div>
    </div>
  );
}
