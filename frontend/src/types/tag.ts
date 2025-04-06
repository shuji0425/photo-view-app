/** 基本のタグ型 */
export type Tag = {
  id: number;
  name: string;
  categoryId?: number | null;
  sortOrder: number;
};
