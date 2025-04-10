"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { PublicPhotoDetail } from "@/types/public/photo";
import { getPublicPhotoById } from "@/lib/api/photo/getPublicById";
import { ExifInfoSection } from "@/components/photo/display/ExifInfo";
import { GPSInfoSection } from "@/components/photo/display/GPSInfo";
import { TagList } from "@/components/photo/display/TagList";
import { FooterNavBar } from "@/components/layout/FooterNavBar";

/**
 * 写真詳細画面
 */
export default function PhotoDetailPage() {
  const params = useParams();
  const [photo, setPhoto] = useState<PublicPhotoDetail | null>(null);

  useEffect(() => {
    const idParam = params?.id;
    if (!idParam) return;
    const fetchPhoto = async () => {
      const photoId = Number(idParam);
      if (isNaN(photoId)) return;

      const data = await getPublicPhotoById(photoId);
      setPhoto(data);
    };
    fetchPhoto();
  }, [params]);

  if (!photo) {
    return <p className="p-4">写真が見つかりませんでした。</p>;
  }

  return (
    <div className="min-h-full flex-1 max-w-xl mx-auto bg-gray-100 text-gray-700 flex flex-col">
      <main className="pb-16">
        <div className="p-4">
          {/* 画像表示 */}
          <div className="w-full max-h-[80vh] mb-4 flex justify-center bg-white rounded shadow p-4">
            <Image
              src={photo.imageUrl}
              alt={photo.title ?? "photo"}
              width={1200}
              height={800}
              className="object-contain w-full h-auto"
            />
          </div>

          {/* 写真紹介 */}
          {(photo.title || photo.takenAt || photo.description) && (
            <div className="bg-white rounded shadow p-4">
              {photo.title && (
                <h1 className="text-2xl font-bold mb-2">{photo.title}</h1>
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
                <p className="text-base mb-2 whitespace-pre-wrap">
                  {photo.description}
                </p>
              )}
            </div>
          )}

          {/* 詳細情報 */}
          {photo.exif && <ExifInfoSection exif={photo.exif} />}
          {photo.gps && <GPSInfoSection gps={photo.gps} />}
          {photo.tags.length > 0 && <TagList tags={photo.tags} />}
        </div>
      </main>

      <FooterNavBar />
    </div>
  );
}
