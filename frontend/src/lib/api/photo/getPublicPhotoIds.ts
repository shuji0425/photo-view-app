import { apiFetch } from "../client";

/**
 * 写真ID一覧を取得
 */
export const getPublicPhotoIds = async (): Promise<{ id: number }[]> => {
  return apiFetch<{ id: number }[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/public/photos/ids`
  );
};
