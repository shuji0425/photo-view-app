import useSWR from "swr";
import { getPublicPhotoById } from "@/lib/api/photo/getPublicById";
import { PublicPhotoDetail } from "@/types/public/photo";

/**
 * 写真IDから詳細を取得(SWR)
 * @param id 写真ID
 * @returns 写真詳細 + SWR 状態
 */
export const usePublicPhotoById = (id?: number) => {
  return useSWR<PublicPhotoDetail>(id ? `/photo/${id}` : null, () =>
    getPublicPhotoById(id!)
  );
};
