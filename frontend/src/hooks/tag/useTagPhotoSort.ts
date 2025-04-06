import { useEffect } from "react";
import { useTagPhotos } from "@/lib/swr/useTagPhotos";
import { useSortableItems } from "../useSortableItems";
import { PhotoWithSortOrder } from "@/types/dto/photo";

/**
 * タグIDに紐づく写真を取得
 * @param tagId タグID
 * @returns 並び替え後の写真情報
 */
export const useTagPhotoSort = (tagId?: number) => {
  const { data, error, isLoading, mutate } = useTagPhotos(tagId);
  const {
    items: photos,
    setItems: setPhotos,
    handleReorder,
  } = useSortableItems<PhotoWithSortOrder>([]);

  // 並び替え
  useEffect(() => {
    if (data) {
      const mapped = data.map((d) => ({ ...d, id: d.photoId }));
      const sorted = mapped.sort((a, b) => a.sortOrder - b.sortOrder);
      setPhotos(sorted);
    }
  }, [data, setPhotos]);

  return { photos, setPhotos, handleReorder, isLoading, error, mutate };
};
