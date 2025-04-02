import { PhotoDetail } from "@/types/photo";
import { apiFetch } from "../client";

/**
 * id配列から情報を取得
 * @param ids id配列
 * @returns 配列
 */
export const getPhotosByIds = async (ids: number[]): Promise<PhotoDetail[]> => {
  if (ids.length === 0) return [];

  const query = ids.join(",");
  return apiFetch<PhotoDetail[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/photos/ids?ids=${query}`
  );
};
