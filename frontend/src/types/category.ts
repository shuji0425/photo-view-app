/** カテゴリー */
export type Category = {
  id: number;
  name: string;
  sortOrder: number;
};

/** カテゴリを使用するときの型 */
export type CategoryOption = {
  label: string;
  value: number;
};
