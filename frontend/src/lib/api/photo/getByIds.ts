import { PhotoDetailDTO } from "@/types/dto/photo";
import { PhotoDetail } from "@/types/photo";
import { convertPhotoDetailArray } from "@/lib/converters/photo";

/**
 * id配列から情報を取得
 * @param ids id配列
 * @returns 配列
 */
export const getPhotosByIds = async (ids: number[]): Promise<PhotoDetail[]> => {
  if (ids.length === 0) return [];

  const query = ids.join(",");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/photos/ids?ids=${query}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "画像情報の取得に失敗しました");
  }

  const json: PhotoDetailDTO[] = await res.json();
  return convertPhotoDetailArray(json);
};
