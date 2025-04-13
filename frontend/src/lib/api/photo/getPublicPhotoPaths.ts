import { getPublicPhotoIds } from "./getPublicPhotoIds";

/**
 * サイトマップ用のID返却
 */
export const getPublicPhotoPaths = async (): Promise<string[]> => {
  const ids = await getPublicPhotoIds();
  return ids.map((item) => `/photo/${item.id}`);
};
