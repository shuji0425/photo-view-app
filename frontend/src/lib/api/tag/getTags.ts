const allTags = [
  "桜",
  "サクラ",
  "櫻",
  "風景",
  "夜景",
  "自然",
  "ポートレート",
  "旅行",
  "猫",
  "人物",
  "街",
  "花",
  "秋",
  "夏",
  "冬",
  "春",
];

/**
 * クエリに一致するタグ候補を取得
 * @param query 検索文字
 * @returns 文字配列
 */
export const getTagsByQuery = async (query: string): Promise<string[]> => {
  if (!query.trim()) return [];

  return allTags.filter((tag) => tag.includes(query));
};
