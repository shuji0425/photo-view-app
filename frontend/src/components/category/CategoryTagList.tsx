type CategoryTagListProps = {
  tags: string[];
  selectedTag: string;
  onTagSelect: (tag: string) => void;
};

import CategoryTag from "./CategoryTag";

export default function CategoryTagList({
  tags,
  selectedTag,
  onTagSelect,
}: CategoryTagListProps) {
  return (
    <div className="flex gap-2 overflow-x-auto px-4 py-2">
      {tags.map((tag) => (
        <CategoryTag
          key={tag}
          tag={tag}
          isSelected={tag === selectedTag}
          onClick={() => onTagSelect(tag)}
        />
      ))}
    </div>
  );
}
