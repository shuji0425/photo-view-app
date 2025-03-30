// lib/api/photo/getPhotosByIds.ts
export type PhotoDetailDTO = {
  id: number;
  image_url: string;
  aspect_ratio: number;
  title: string | null;
  description: string | null;
  category_id: number | null;
  user_id: number | null;
  is_visible: boolean;
  taken_at: string | null;
};

// アップロード後の返却配列
export type UploadResponseDTO = {
  photo_ids: number[];
};
