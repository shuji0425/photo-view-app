import { apiFetch } from "../client";
import { PaginatedPhotoResponseDTO } from "@/types/dto/photo";

/**
 * ページネーション付きの画像取得
 * @param page ページ番号
 * @param limit 1ページあたりの取得数
 */
export const getPaginatedPhotos = (
  page = 1,
  limit = 30
): Promise<PaginatedPhotoResponseDTO> => {
  const query = `?page=${page}&limit=${limit}`;
  return apiFetch<PaginatedPhotoResponseDTO>(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/photos${query}`
  );
};
