import { Category } from "@/types/category";
import { apiFetch } from "../client";

/**
 * カテゴリーを取得し変換して返却
 * @returns json
 */
export const getCategories = (): Promise<Category[]> => {
  return apiFetch<Category[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/categories`
  );
};
