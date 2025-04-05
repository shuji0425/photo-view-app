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
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Tag } from "@/types/tag";
import { GripVertical, X } from "lucide-react";
import Link from "next/link";

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
          <ul className="space-y-2">
            {tags.map((tag) => (
              <SortableItem key={tag.id} tag={tag} onRemove={onRemove} />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    </div>
  );
};

// 個々のSortableアイテム
const SortableItem = ({
  tag,
  onRemove,
}: {
  tag: Tag;
  onRemove: (id: number) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: tag.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="flex items-center justify-between border p-2 rounded bg-white shadow-sm"
    >
      <span className="truncate">{tag.name}</span>
      <div className="flex items-center gap-2">
        {/* 遷移用 */}
        <Link href={`/admin/tags/${tag.id}/photos`}>
          <button
            type="button"
            className="text-blue-500 hover:text-blue-700 text-sm"
          >
            写真並び替え
          </button>
        </Link>

        {/* 削除用 */}
        <button
          type="button"
          className="text-gray-500 hover:text-red-500"
          onClick={() => onRemove(tag.id)}
        >
          <X className="w-4 h-4" />
        </button>

        {/* 移動用 */}
        <button
          type="button"
          {...attributes}
          {...listeners}
          className="cursor-grab text-gray-400 hover:text-gray-600"
          onClick={() => onRemove(tag.id)}
          aria-label="並び替えハンドル"
        >
          <GripVertical className="w-4 h-4" />
        </button>
      </div>
    </li>
  );
};
