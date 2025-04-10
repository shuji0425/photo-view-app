"use client";

import { motion } from "framer-motion";
import { Tag } from "lucide-react";
import type { Tag as TagType } from "@/types/tag";
import { useRouter } from "next/navigation";

type Props = {
  tags: TagType[];
};

export const TagList = ({ tags }: Props) => {
  const router = useRouter();

  if (tags.length === 0) return null;

  // クリックでホーム画面へ遷移
  const handleClick = (tagId: number) => {
    router.push(`/?tag_id=${tagId}`);
  };

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
          <button
            key={tag.id}
            onClick={() => handleClick(tag.id)}
            className="px-3 py-1 text-xs bg-gray-200 rounded-full text-gray-700 cursor-pointer"
          >
            #{tag.name}
          </button>
        ))}
      </div>
    </motion.div>
  );
};
