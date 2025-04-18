"use client";

import { getTagDefault } from "@/lib/api/tag/getDefault";
import { getPublicPhotosByTagId } from "@/lib/api/tag/getPublicPhotosByTagId";
import { PublicPhoto } from "@/types/public/photo";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

/**
 * ホームページの状態管理・取得などのフック
 * @returns object
 */
export const useHomePageState = () => {
  const [photos, setPhotos] = useState<PublicPhoto[]>([]);
  const [selectedTagId, setSelectedTagId] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const router = useRouter();
  const searchParams = useSearchParams();
  const tagIdFromQuery = searchParams.get("tag_id");
  const photoIndexFromQuery = searchParams.get("photo_index");

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
  }, [photos.length, photoIndexFromQuery]);

  // タグ選択後にURLに反映
  const handleTagSelect = (tagId: number) => {
    setSelectedTagId(tagId);
    setActiveIndex(0);
    router.replace(`/?tag_id=${tagId}&photo_index=0`);
  };

  return {
    photos,
    selectedTagId,
    handleTagSelect,
    activeIndex,
    setActiveIndex,
  };
};
