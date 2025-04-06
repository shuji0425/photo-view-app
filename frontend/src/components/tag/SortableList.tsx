"use client";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Tag } from "@/types/tag";
import { SortableListItems } from "./SortableListItems";

type Props = {
  tags: Tag[];
  onReorder: (activeId: number, overId: number) => void;
  onRemove: (id: number) => void;
};

/**
 * 選択中タグ一覧
 */
export const SortableList = ({ tags, onReorder, onRemove }: Props) => {
  const items = tags.map((t) => t.id);
  // マウスタッチ対応
  const sensors = useSensors(useSensor(PointerSensor));

  // 並び順変更時の修正
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    onReorder(Number(active.id), Number(over.id));
  };

  return (
    <div className="w-full md:w-1/2 border rounded-md p-4 max-h-[80vh] overflow-y-auto">
      <h2 className="text-lg font-semibold mb-2">並び順</h2>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <SortableListItems tags={tags} onRemove={onRemove} />
        </SortableContext>
      </DndContext>
    </div>
  );
};
