import { PhotoDetailDTO } from "@/types/dto/photo";
import {
  convertPhotoDetail,
  convertPhotoDetailArray,
} from "@/lib/converters/photo";

export type PaginatedPhotosResponse = {
  photos: PhotoDetailDTO[];
  total: number;
  page: number;
  limit: number;
};

/**
 * ページネーション付きの画像取得
 * @param page ページ番号
 * @param limit 1ページあたりの取得数
 */
export const getPaginatedPhotos = async (
  page: number,
  limit: number
): Promise<{
  photos: ReturnType<typeof convertPhotoDetail>[];
  total: number;
  page: number;
  limit: number;
}> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/photos/?page=${page}&limit=${limit}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!res.ok) {
    throw new Error("画像の取得に失敗しました");
  }

  const data: PaginatedPhotosResponse = await res.json();
  return {
    photos: convertPhotoDetailArray(data.photos),
    total: data.total,
    page: data.page,
    limit: data.limit,
  };
};
