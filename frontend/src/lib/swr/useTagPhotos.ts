import useSWR from "swr";
import { getPhotosByTagId } from "../api/tag/getPhotosByTagId";
import { PhotoWithSortOrder } from "@/types/dto/photo";

/**
 * タグIDに紐づく写真を取得
 * @param tagId タグID
 * @returns 写真情報
 */
export const useTagPhotos = (tagId?: number) => {
  return useSWR<PhotoWithSortOrder[]>(
    tagId ? `/admin/tags/${tagId}/photos` : null,
    () => getPhotosByTagId(tagId!)
  );
};
