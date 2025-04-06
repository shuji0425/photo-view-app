"use client";

import { GripVertical, X } from "lucide-react";
import Link from "next/link";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

type Props = {
  tagId: number;
  onRemove: (id: number) => void;
  dragHandleProps: {
    attributes: React.HTMLAttributes<HTMLElement>;
    listeners: SyntheticListenerMap | undefined;
  };
};

/**
 * タグの操作ボタン群
 */
export const SortableItemActions = ({
  tagId,
  onRemove,
  dragHandleProps,
}: Props) => {
  return (
    <div className="flex items-center gap-2">
      {/* 遷移用 */}
      <Link href={`/admin/tags/${tagId}/photos`}>
        <button
          type="button"
          className="text-blue-500 hover:text-blue-700 text-sm cursor-pointer"
        >
          写真並び替え
        </button>
      </Link>

      {/* 削除用 */}
      <button
        type="button"
        className="text-gray-500 hover:text-red-500 cursor-pointer"
        onClick={() => onRemove(tagId)}
      >
        <X className="w-4 h-4" />
      </button>

      {/* 移動用 */}
      <button
        type="button"
        {...dragHandleProps.attributes}
        {...dragHandleProps.listeners}
        className="cursor-grab text-gray-400 hover:text-gray-600"
        onClick={() => onRemove(tagId)}
        aria-label="並び替えハンドル"
      >
        <GripVertical className="w-4 h-4" />
      </button>
    </div>
  );
};
