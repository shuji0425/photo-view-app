"use client";

import { motion } from "framer-motion";
import { Tag } from "lucide-react";
import type { Tag as TagType } from "@/types/tag";

type Props = {
  tags: TagType[];
};

export const TagList = ({ tags }: Props) => {
  if (tags.length === 0) return null;

  return (
    <motion.div
      className="mt-6 bg-white rounded shadow p-4 text-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
        <Tag size={16} />
        タグ
      </h2>
      <div className="flex flex-wrap gap-2 mt-2">
        {tags.map((tag) => (
          <span
            key={tag.id}
            className="px-3 py-1 text-xs bg-gray-200 rounded-full text-gray-700"
          >
            #{tag.name}
          </span>
        ))}
      </div>
    </motion.div>
  );
};
