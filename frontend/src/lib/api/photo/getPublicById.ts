import { PublicPhotoDetail } from "@/types/public/photo";
import { apiFetch } from "../client";

/**
 * 写真IDから詳細情報を取得
 * @param photoId 写真ID
 * @returns 写真詳細情報
 */
export const getPublicPhotoById = async (
  photoId: number
): Promise<PublicPhotoDetail> => {
  return apiFetch<PublicPhotoDetail>(
    `${process.env.NEXT_PUBLIC_API_URL}/public/photo/${photoId}`
  );
};
