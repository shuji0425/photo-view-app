export type Photo = {
  id: number;
  url: string;
  tags: string[];
  title?: string;
  width: number;
  height: number;
};

/**
 * 編集用
 */
export type PhotoDetail = {
  id: number;
  imageUrl: string;
  aspectRatio: number;
  title?: string | null;
  description?: string | null;
  categoryId?: number | null;
  userId?: number | null;
  isVisible: boolean;
  takenAt?: string | null; // ISO文字列（例: "2025-03-30T12:34:56Z"）
  tags?: string[];
};

/**
 * 送信用
 */
export type PhotoUpdateRequest = {
  photo_id: number;
  title: string | null;
  description: string | null;
  category_id: number | null;
  is_visible: boolean;
  taken_at: string | null; // ISO8601
  tags: string[];
};

/** 配列用 */
export type PhotoBulkUpdateRequest = {
  updates: PhotoUpdateRequest[];
};
