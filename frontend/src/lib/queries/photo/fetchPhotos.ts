import { getPaginatedPhotos } from "@/lib/api/photo/getPaginated";
import { PhotoDetail } from "@/types/photo";
import camelcaseKeys from "camelcase-keys";

/**
 * DTOをフロント向けに整形して返す（重複除外含む）
 */
export const fetchPhotos = async (
  page: number,
  limit: number,
  existingIds: Set<number>
): Promise<{ photos: PhotoDetail[]; total: number }> => {
  const res = await getPaginatedPhotos(page, limit);
  const converted = camelcaseKeys(res.photos, { deep: true }) as PhotoDetail[];

  const uniquePhotos = converted.filter((p) => !existingIds.has(p.id));

  return {
    photos: uniquePhotos,
    total: res.total,
  };
};
