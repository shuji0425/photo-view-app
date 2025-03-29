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
export type EditablePhoto = {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  tagIds: number[];
  categoryId: number | null;
  isVisible: boolean;
};
