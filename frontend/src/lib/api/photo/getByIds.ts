import { PhotoDetailDTO } from "@/types/dto/photo";

export const getPhotosByIds = async (
  ids: number[]
): Promise<PhotoDetailDTO[]> => {
  if (ids.length === 0) return [];

  const query = ids.join(",");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/photos/ids/?ids=${query}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "画像情報の取得に失敗しました");
  }

  const data: PhotoDetailDTO[] = await res.json();
  return data;
};
