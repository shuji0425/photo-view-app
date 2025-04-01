import { PhotoBulkUpdateParams } from "@/lib/schema/photoSchema";

/**
 * 一括更新（写真＆タグ）
 */
export const updatePhotos = async (
  params: PhotoBulkUpdateParams
): Promise<void> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/photos/bulk-update`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(params),
    }
  );

  if (!res.ok) throw new Error("更新に失敗しました");
};
