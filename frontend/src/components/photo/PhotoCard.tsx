import type { Photo } from "@/types/photo";
import Image from "next/image";

type Props = {
  photo: Photo;
};

export default function PhotoCard({ photo }: Props) {
  return (
    <div className="rounded-lg overflow-hidden">
      <Image
        src={photo.url}
        alt={photo.title ?? ""}
        width={photo.width}
        height={photo.height}
        className="w-full h-auto object-cover"
        sizes="(max-width: 768px) 100vw, 400px"
      />
      {photo.title && (
        <p className="text-sm text-gray-700 mt-1 px-1">{photo.title}</p>
      )}
    </div>
  );
}
