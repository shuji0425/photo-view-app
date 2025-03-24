type CategoryTagProps = {
  tag: string;
  isSelected?: boolean;
  onClick?: () => void;
};

export default function CategoryTag({
  tag,
  isSelected = false,
  onClick,
}: CategoryTagProps) {
  return (
    <button
      onClick={onClick}
      className={`text-sm px-3 py-1 rounded-full border ${
        isSelected ? "bg-black text-white" : "bg-gray-100 text-gray-700"
      }`}
    >
      #{tag}
    </button>
  );
}
