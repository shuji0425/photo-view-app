// lib/api/photo/getPhotosByIds.ts
export type PhotoDetailDTO = {
  id: number;
  image_url: string;
  width: number;
  height: number;
  aspect_ratio: number;
  title: string | null;
  description: string | null;
  category_id: number | null;
  user_id: number | null;
  is_visible: boolean;
  taken_at: string | null;
  tags: string[];
};

// ページネーション用DTO
export type PaginatedPhotoResponseDTO = {
  photos: PhotoDetailDTO[];
  total: number;
  page: number;
  limit: number;
};

// タグに紐づく写真を取得
export type PhotoWithSortOrder = {
  id: number;
  photoId: number;
  url: string;
  sortOrder: number;
};
