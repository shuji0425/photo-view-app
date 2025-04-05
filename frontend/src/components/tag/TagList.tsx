"use client";

import { Tag } from "@/types/tag";
import { Plus } from "lucide-react";

type Props = {
  tags: Tag[];
  onAdd: (tag: Tag) => void;
  selectedIds: number[];
};

/**
 * タグ一覧（追加可能なタグのみ表示）
 */
export const TagList = ({ tags, onAdd, selectedIds }: Props) => {
  // 未選択のタグのみ表示する
  const unselectedTags = tags.filter((tag) => !selectedIds.includes(tag.id));

  return (
    <div className="w-full md:w-1/2 border rounded-md p-4 max-h-[80vh] overflow-y-auto">
      <h2 className="text-lg font-semibold mb-2">全タグ一覧</h2>

      {unselectedTags.length === 0 ? (
        <p className="text-gray-500 text-sm">追加可能なタグはありません</p>
      ) : (
        <ul className="space-y-2">
          {unselectedTags.map((tag) => (
            <li
              key={tag.id}
              className="flex items-center justify-between border p-2 rounded hover:bg-gray-500"
            >
              <span className="truncate">{tag.name}</span>
              <button
                className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
                onClick={() => onAdd(tag)}
              >
                <Plus className="w-4 h-4" />
                追加
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
