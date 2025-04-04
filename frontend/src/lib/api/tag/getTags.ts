import { apiFetch } from "../client";

/**
 * クエリに一致するタグ候補を取得
 * @param query 検索文字
 * @returns 文字配列
 */
export const getTagsByQuery = async (query: string): Promise<string[]> => {
  if (!query.trim()) return [];

  return await apiFetch<string[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/tags?query=${query}`
  );
};
