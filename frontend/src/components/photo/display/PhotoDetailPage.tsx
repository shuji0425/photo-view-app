"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { ExifInfoSection } from "@/components/photo/display/ExifInfo";
import { GPSInfoSection } from "@/components/photo/display/GPSInfo";
import { TagList } from "@/components/photo/display/TagList";
import { FooterNavBar } from "@/components/layout/FooterNavBar";
import { usePublicPhotoById } from "@/lib/swr/usePublicPhotoById";
import { PublicPhotoDetail } from "@/types/public/photo";

type Props = {
  initialPhoto: PublicPhotoDetail;
};

/**
 * 写真詳細画面
 */
export default function PhotoDetailPage({ initialPhoto }: Props) {
  const params = useParams();
  const id = Number(params?.id);
  const {
    data: photo = initialPhoto,
    isLoading,
    error,
  } = usePublicPhotoById(isNaN(id) ? undefined : id);

  if (isLoading) return <p className="p-4">読み込み中...</p>;
  if (error || !photo)
    return <p className="p-4">写真が見つかりませんでした。</p>;

  return (
    <div className="min-h-full flex-1 max-w-xl mx-auto bg-gray-100 text-gray-700 flex flex-col">
      <main className="pb-16">
        <div className="p-4">
          {/* 画像表示 */}
          <div className="w-full max-h-[80vh] mb-4 flex justify-center bg-white rounded shadow p-4">
            <Image
              src={photo.imageUrl}
              alt={photo.title ?? "photo"}
              width={photo.width}
              height={photo.height}
              priority
              className="object-cover w-full h-auto"
              loading="eager"
              fetchPriority="high"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>

          {/* 写真紹介 */}
          {(photo.title || photo.takenAt || photo.description) && (
            <div className="bg-white rounded shadow p-4">
              {photo.title && (
                <h2 className="text-2xl font-bold mb-2">{photo.title}</h2>
              )}
              {photo.takenAt && (
                <p className="text-sm mb-2">
                  撮影日:{" "}
                  {new Date(photo.takenAt).toLocaleDateString("ja-JP", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              )}
              {photo.description && (
                <p className="text-base mb-2 whitespace-pre-wrap break-words">
                  {photo.description}
                </p>
              )}
            </div>
          )}

          {/* 詳細情報 */}
          {photo.exif && Object.keys(photo.exif).length > 0 && (
            <ExifInfoSection exif={photo.exif} />
          )}
          {photo.gps && Object.keys(photo.gps).length > 0 && (
            <GPSInfoSection gps={photo.gps} />
          )}
          {photo.tags.length > 0 && <TagList tags={photo.tags} />}
        </div>
      </main>

      <FooterNavBar />
    </div>
  );
}
