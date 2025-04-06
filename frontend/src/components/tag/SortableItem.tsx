"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Tag } from "@/types/tag";
import { SortableItemActions } from "./SortableItemActions";

type Props = {
  tag: Tag;
  onRemove: (id: number) => void;
};

/**
 * 並び替え可能なタグ1件を表示する
 */
export const SortableItem = ({ tag, onRemove }: Props) => {
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
      <SortableItemActions
        tagId={tag.id}
        onRemove={onRemove}
        dragHandleProps={{ attributes, listeners }}
      />
    </li>
  );
};
