"use client";

import { useEffect, useState } from "react";
import CategoryTagList from "@/components/category/CategoryTagList";
import PhotoViewer from "@/components/photo/PhotoViewer";
import { getTagDefault } from "@/lib/api/tag/getDefault";
import { getPublicPhotosByTagId } from "@/lib/api/tag/getPublicPhotosByTagId";
import { PublicPhoto } from "@/types/public/photo";
import { getTagsWithPhotos } from "@/lib/api/tag/getWithPhotos";
import { Tag } from "@/types/tag";

export default function HomePage() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTagId, setSelectedTagId] = useState<number | null>(null);
  const [photos, setPhotos] = useState<PublicPhoto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 初期タグ取得
  useEffect(() => {
    const fetchDefaultTag = async () => {
      try {
        const tag = await getTagDefault();
        setSelectedTagId(tag.id);
      } catch (err) {
        console.error("タグの取得に失敗:", err);
      }
    };
    fetchDefaultTag();
  }, []);

  // タグに紐づく写真を取得
  useEffect(() => {
    if (selectedTagId === null) return;

    const fetchPhotos = async () => {
      try {
        setIsLoading(true);
        const photos = await getPublicPhotosByTagId(selectedTagId);
        setPhotos(photos);
      } catch (err) {
        console.error("写真の取得に失敗:", err);
        setPhotos([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPhotos();
  }, [selectedTagId]);

  // タグ一覧
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const tags = await getTagsWithPhotos();
        setTags(tags);
      } catch (err) {
        console.error("タグ一覧の取得に失敗:", err);
      }
    };
    fetchTags();
  }, []);

  return (
    <div className="h-screen w-screen max-w-full flex flex-col overflow-hidden bg-white">
      {/* カテゴリータグ */}
      <div className="shrink-0 w-full overflow-x-auto">
        <div className="flex gap-2 w-max">
          <CategoryTagList
            tags={tags}
            selectedTagId={selectedTagId}
            onTagSelect={(id) => setSelectedTagId(id)}
          />
        </div>
      </div>

      {/* メインビュー */}
      <div className="overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            読み込み中...
          </div>
        ) : photos.length > 0 ? (
          <PhotoViewer photos={photos} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            該当する写真が見つかりませんでした。
          </div>
        )}
      </div>
    </div>
  );
}
