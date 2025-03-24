import Image from "next/image";
import type { Photo } from "@/types/photo";

type Props = {
  photos: Photo[];
  currentIndex: number;
  onSelect: (index: number) => void;
};

export default function PhotoThumbnailList({
  photos,
  currentIndex,
  onSelect,
}: Props) {
  return (
    <div className="flex gap-2 overflow-x-auto px-1 py-2">
      {photos.map((photo, index) => (
        <button
          key={photo.id}
          onClick={() => onSelect(index)}
          className={`relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden border ${
            index === currentIndex ? "border-black" : "border-gray-300"
          }`}
        >
          <Image
            src={photo.url}
            alt=""
            fill
            className="object-cover"
            sizes="64px"
          />
        </button>
      ))}
    </div>
  );
}
