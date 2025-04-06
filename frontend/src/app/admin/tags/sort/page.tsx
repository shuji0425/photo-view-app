"use client";

import { useTagSort } from "@/hooks/tag/useTagSort";
import { TagList } from "@/components/tag/TagList";
import { SortableList } from "@/components/tag/SortableList";

export default function TagSortPage() {
  const {
    allTags,
    selectedTags,
    handleAdd,
    handleRemove,
    handleReorder,
    handleSave,
  } = useTagSort();

  return (
    <div className="relative flex flex-col  w-full">
      {/* メインエリア */}
      <div className="flex flex col md:flex-row gap-4 flex-1 overflow-hidden p-4">
        <TagList
          tags={allTags}
          onAdd={handleAdd}
          selectedIds={selectedTags.map((t) => t.id)}
        />

        <SortableList
          tags={selectedTags}
          onRemove={handleRemove}
          onReorder={handleReorder}
        />
      </div>

      {/* 下部固定の保存ボタン */}
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-md p-4 border-t z-50">
        <button
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded"
          onClick={handleSave}
        >
          並び順を保存
        </button>
      </div>
    </div>
  );
}
