import type { Photo } from "@/types/photo";
import PhotoCard from "./PhotoCard";

type Props = {
  photos: Photo[];
};

export default function PhotoList({ photos }: Props) {
  if (photos.length === 0) {
    return <p className="text-gray-400">このタグに写真はまだありません。</p>;
  }

  return (
    <div className="space-y-4">
      {photos.map((photo) => (
        <PhotoCard key={photo.id} photo={photo} />
      ))}
    </div>
  );
}
