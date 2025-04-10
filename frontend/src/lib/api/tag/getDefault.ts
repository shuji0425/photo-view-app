import { apiFetch } from "../client";
import { Tag } from "@/types/tag";

/**
 * タグ順が1番若いタグを取得（0は除外）
 */
export const getTagDefault = (): Promise<Tag> => {
  return apiFetch<Tag>(
    `${process.env.NEXT_PUBLIC_API_URL}/public/tags/default`
  );
};
