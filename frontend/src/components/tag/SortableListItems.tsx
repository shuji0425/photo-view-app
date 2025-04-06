"use client";

import { Tag } from "@/types/tag";
import { SortableItem } from "./SortableItem";

type Props = {
  tags: Tag[];
  onRemove: (id: number) => void;
};

/**
 * 並び替え対象のタグリスト描画
 */
export const SortableListItems = ({ tags, onRemove }: Props) => {
  return (
    <ul className="space-y-2">
      {tags.map((tag) => (
        <SortableItem key={tag.id} tag={tag} onRemove={onRemove} />
      ))}
    </ul>
  );
};
