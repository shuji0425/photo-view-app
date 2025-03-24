import { mockPhotos } from "@/data/photo";
import Image from "next/image";
import Link from "next/link";

type Params = {
  params: { id: string };
};

export default async function PhotoDetailPage({ params }: Params) {
  const { id } = await Promise.resolve(params);
  const photo = mockPhotos.find((p) => String(p.id) === id);

  if (!photo) {
    return <div className="p-4">写真が見つかりませんでした。</div>;
  }

  return (
    <div className="p-4 space-y-4">
      <Link href="/" className="text-blue-500 underline">
        ← 戻る
      </Link>

      <Image
        src={photo.url}
        alt={photo.title ?? ""}
        width={photo.width}
        height={photo.height}
        className="w-full h-auto"
      />

      <p className="text-lg font-bold">ID: {photo.id}</p>
      <div className="flex gap-2 mt-2 flex-wrap">
        {photo.tags.map((tag) => (
          <span
            key={tag}
            className="text-sm px-2 py-1 bg-gray-700 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}
