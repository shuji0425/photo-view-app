import { PhotoBulkUpdateParams } from "@/lib/schema/photoSchema";
import { apiFetch } from "../client";

/**
 * 一括更新（写真＆タグ）
 */
export const updatePhotos = (data: PhotoBulkUpdateParams): Promise<void> => {
  return apiFetch<void, PhotoBulkUpdateParams>(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/photos/bulk-update`,
    {
      method: "POST",
      body: data,
    }
  );
};
