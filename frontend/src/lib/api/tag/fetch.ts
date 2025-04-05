import { Tag } from "@/types/tag";
import { apiFetch } from "../client";

/**
 * 全件取得
 * @returns Tag配列
 */
export const getAllTags = (): Promise<Tag[]> => {
  return apiFetch<Tag[]>(`${process.env.NEXT_PUBLIC_API_URL}/admin/tags/all`);
};
