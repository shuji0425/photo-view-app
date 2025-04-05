import { apiFetch } from "../client";
import { PhotoWithSortOrder } from "@/types/dto/photo";

/**
 * 指定タグに紐づく写真情報を取得
 * @param tagId タグID
 * @returns 写真情報の配列
 */
export const getPhotosByTagId = (
  tagId: number
): Promise<PhotoWithSortOrder[]> => {
  return apiFetch<PhotoWithSortOrder[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/tags/${tagId}/photos`
  );
};
