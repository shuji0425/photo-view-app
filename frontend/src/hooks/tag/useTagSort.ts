import { useState, useEffect } from "react";
import { Tag } from "@/types/tag";
import { getAllTags } from "@/lib/api/tag/fetch";
import { updateTagSortOrder } from "@/lib/api/tag/sortUpdate";
import toast from "react-hot-toast";

export const useTagSort = () => {
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  // タグ一覧を取得
  useEffect(() => {
    const fetchTags = async () => {
      const tags = await getAllTags();
      const sorted = [...tags]
        .filter((tag) => tag.sortOrder && tag.sortOrder >= 1)
        .sort((a, b) => a.sortOrder! - b.sortOrder!);
      setAllTags(tags);
      setSelectedTags(sorted);
    };
    fetchTags();
  }, []);

  // 並び順追加
  const handleAdd = (tag: Tag) => {
    if (!selectedTags.find((t) => t.id === tag.id)) {
      setSelectedTags((prev) => [...prev, tag]);
    }
  };

  // 並び順解除
  const handleRemove = (id: number) => {
    setSelectedTags((prev) => prev.filter((t) => t.id !== id));
  };

  // 並び更新
  const handleReorder = (newOrder: Tag[]) => {
    setSelectedTags(newOrder);
  };

  // 保存処理
  const handleSave = async () => {
    const payload = selectedTags.map((tag, index) => ({
      id: tag.id,
      sortOrder: index + 1,
    }));

    try {
      await updateTagSortOrder(payload);
      toast.success("並び順を保存しました");
    } catch (err) {
      console.error(err);
      toast.error("保存に失敗しました");
    }
  };

  return {
    allTags,
    selectedTags,
    handleAdd,
    handleRemove,
    handleReorder,
    handleSave,
  };
};
