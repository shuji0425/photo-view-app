import { convertCategoryArray } from "@/lib/converters/category";
import { Category } from "@/types/category";
import { CategoryDTO } from "@/types/dto/category";

/**
 * カテゴリーを取得し変換して返却
 * @returns json
 */
export const getCategories = async (): Promise<Category[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("カテゴリの取得に失敗しました");
  }

  const json: CategoryDTO[] = await res.json();
  return convertCategoryArray(json);
};
