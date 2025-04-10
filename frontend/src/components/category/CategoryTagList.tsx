import { Tag } from "@/types/tag";
import CategoryTag from "./CategoryTag";

type CategoryTagListProps = {
  tags: Tag[];
  selectedTagId: number | null;
  onTagSelect: (tagId: number) => void;
};

export default function CategoryTagList({
  tags,
  selectedTagId,
  onTagSelect,
}: CategoryTagListProps) {
  return (
    <div className="flex gap-2 overflow-x-auto px-4 py-2">
      {tags.map((tag) => (
        <CategoryTag
          key={tag.id}
          tag={tag}
          isSelected={tag.id === selectedTagId}
          onClick={() => onTagSelect(tag.id)}
        />
      ))}
    </div>
  );
}
