import { apiFetch } from "../client";

/**
 * idの配列を元に一括削除
 * @param ids id配列
 */
export const deletePhotosByIds = (ids: number[]) => {
  return apiFetch<void, { ids: number[] }>(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/photos`,
    {
      method: "DELETE",
      body: { ids },
    }
  );
};
