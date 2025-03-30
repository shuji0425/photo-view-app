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
};
