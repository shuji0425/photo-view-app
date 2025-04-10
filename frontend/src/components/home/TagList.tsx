"use client";

import { useEffect, useState } from "react";
import { Tag } from "@/types/tag";
import { getTagsWithPhotos } from "@/lib/api/tag/getWithPhotos";
import { cn } from "@/lib/utils/cn";

type Props = {
  selectedTagId: number | null;
  onSelect: (tagId: number) => void;
};

/**
 * タグリスト表示用
 */
export const TagList = ({ selectedTagId, onSelect }: Props) => {
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
            onClick={() => onSelect(tag.id)}
            className={cn(
              "px-4 py-1 rounded-full text-sm whitespace-nowrap cursor-pointer",
              selectedTagId === tag.id
                ? "bg-white text-gray-700"
                : "bg-gray-700 hover:bg-gray-800"
            )}
          >
            #{tag.name}
          </button>
        ))}
      </div>
    </div>
  );
};
