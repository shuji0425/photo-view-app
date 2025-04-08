"use client";

import { useEffect, useState } from "react";
import { Tag } from "@/types/tag";
import { getTagsWithPhotos } from "@/lib/api/tag/getWithPhotos";

/**
 * タグリスト表示用
 */
export const TagList = () => {
  const [tags, setTags] = useState<Tag[]>([]);

  // タグ取得
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const data = await getTagsWithPhotos();
        setTags(data);
      } catch (err) {
        console.error("タグの取得に失敗しました", err);
      }
    };
    fetchTags();
  }, []);

  return (
    <div className="overflow-x-auto whitespace-nowrap px-4 py-2 scrollbar-hide">
      <div className="flex gap-2">
        {tags.map((tag) => (
          <button
            key={tag.id}
            className="px-4 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-sm whitespace-nowrap"
          >
            #{tag.name}
          </button>
        ))}
      </div>
    </div>
  );
};
