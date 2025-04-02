import useSWR from "swr";
import { getCategories } from "../api/category/category";
import { Category } from "@/types/category";

/**
 * カテゴリーを取得
 * @returns object
 */
export const useCategories = () => {
  const { data, error, isLoading } = useSWR<Category[]>(
    "categories",
    getCategories
  );

  return { categories: data ?? [], isLoading, isError: !!error };
};
