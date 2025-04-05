import { arrayMove } from "@dnd-kit/sortable";
import { useState } from "react";

type SortableItem = {
  id: number;
  sortOrder: number;
};

/**
 * 並び順を管理する共通フック
 * @param initialItems 初期データ
 * @returns 新しい並び順を返却
 */
export const useSortableItems = <T extends SortableItem>(initialItems: T[]) => {
  const [items, setItems] = useState<T[]>(() =>
    [...initialItems].sort((a, b) => a.sortOrder - b.sortOrder)
  );

  const handleReorder = (activeId: number, overId: number) => {
    const oldIndex = items.findIndex((item) => item.id === activeId);
    const newIndex = items.findIndex((item) => item.id === overId);
    if (oldIndex === -1 || newIndex === -1) return;

    const newItems = arrayMove(items, oldIndex, newIndex).map(
      (item, index) => ({
        ...item,
        sortOrder: index + 1,
      })
    ) as T[];

    setItems(newItems);
  };

  return { items, setItems, handleReorder };
};
