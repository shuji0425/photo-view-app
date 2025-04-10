import { Tag } from "@/types/tag";
import { apiFetch } from "../client";

/**
 * タグ一覧を取得（写真がないタグは除外）
 */
export const getTagsWithPhotos = async (): Promise<Tag[]> => {
  return await apiFetch<Tag[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/public/tags/with-photos`
  );
};
