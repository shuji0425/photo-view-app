import { useEffect, useState } from "react";
import { getPhotosByIds } from "@/lib/api/photo/getByIds";
import { convertPhotoDetailArray } from "@/lib/converters/photo";
import { PhotoDetail } from "@/types/photo";
import toast from "react-hot-toast";

/**
 * 写真編集用カスタムフック
 * @param ids ID配列
 * @returns 写真情報
 */
export const usePhotoEditor = (ids: number[]) => {
  const [photos, setPhotos] = useState<PhotoDetail[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (ids.length === 0) return;

    const fetchPhotos = async () => {
      setLoading(true);
      try {
        // 取得し加工する
        const dtoArray = await getPhotosByIds(ids);
        const converted = convertPhotoDetailArray(dtoArray);
        setPhotos(converted);
      } catch {
        toast.error("画像の取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [ids]);

  return { photos, setPhotos, loading };
};
