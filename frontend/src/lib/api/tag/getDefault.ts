import { apiFetch } from "../client";
import { Tag } from "@/types/tag";

/**
 * クエリに一致するタグ候補を取得
 * @param query 検索文字
 * @returns 文字配列
 */
export const getTagDefault = (): Promise<Tag> => {
  return apiFetch<Tag>(
    `${process.env.NEXT_PUBLIC_API_URL}/public/tags/default`
  );
};
