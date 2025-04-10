"use client";

import { Tag } from "@/types/tag";

type Props = {
  tags: Tag[];
};

export const TagList = ({ tags }: Props) => {
  if (tags.length === 0) return null;

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2">タグ</h2>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag.id}
            className="px-3 py-1 text-sm bg-gray-200 rounded-full text-gray-700"
          >
            #{tag.name}
          </span>
        ))}
      </div>
    </div>
  );
};
