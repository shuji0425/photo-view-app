import { apiFetch } from "../client";

type SortPayload = {
  photoId: number;
  sortOrder: number;
};

/**
 * タグに紐づく写真の並び順を保存する
 * @param tagId タグID
 * @param payload 並び順つきの写真ID配列
 * @returns void
 */
export const updateTagPhotoSortOrder = (
  tagId: number,
  payload: SortPayload[]
): Promise<void> => {
  return apiFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/tags/${tagId}/photos/sort`,
    {
      method: "PUT",
      body: payload,
    }
  );
};
