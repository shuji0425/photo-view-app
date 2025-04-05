"use client";

import { Tag } from "@/types/tag";
import { Plus, Search } from "lucide-react";
import { Input } from "../ui/Input";
import { useMemo, useState } from "react";

type Props = {
  tags: Tag[];
  onAdd: (tag: Tag) => void;
  selectedIds: number[];
};

/**
 * タグ一覧（追加可能なタグのみ表示）
 */
export const TagList = ({ tags, onAdd, selectedIds }: Props) => {
  const [search, setSearch] = useState("");
  // 未選択のタグのみ表示する
  const unselectedTags = useMemo(
    () =>
      tags.filter(
        (tag) =>
          !selectedIds.includes(tag.id) &&
          tag.name.toLowerCase().includes(search.toLowerCase())
      ),
    [tags, selectedIds, search]
  );

  return (
    <div className="w-full bg-white md:w-1/2 border rounded-md pb-4 px-4 pt-0 max-h-[80vh] overflow-y-auto">
      <div className="sticky top-0 bg-white z-10 flex gap-2 py-2">
        <h2 className="w-[40%] pt-2 text-lg font-semibold">全タグ一覧</h2>

        <div className="relative flex w-[60%]">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="タグ名で検索..."
            className="pl-8"
          />
        </div>
      </div>

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
