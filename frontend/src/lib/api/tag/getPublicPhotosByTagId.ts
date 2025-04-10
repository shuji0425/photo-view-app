import { apiFetch } from "../client";
import { PublicPhoto } from "@/types/public/photo";

/**
 * 指定タグに紐づく写真情報を取得
 * @param tagId タグID
 * @returns 写真情報の配列
 */
export const getPublicPhotosByTagId = (
  tagId: number
): Promise<PublicPhoto[]> => {
  return apiFetch<PublicPhoto[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/public/tags/${tagId}/photos`
  );
};
