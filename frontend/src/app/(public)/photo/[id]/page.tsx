"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { BackButton } from "@/components/ui/BackButton";
import Image from "next/image";
import { PublicPhotoDetail } from "@/types/public/photo";
import { getPublicPhotoById } from "@/lib/api/photo/getPublicById";

export const PhotoDetailPage = () => {
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
    return <p>写真が見つかりませんでした。</p>;
  }

  return (
    <div className="p-4 max-w-3xl mx-auto text-gray-700 bg-gray-100">
      <BackButton />

      <Image
        src={photo.imageUrl}
        alt={photo.title ?? "photo"}
        width={1200}
        height={800}
        className="w-full object-container mb-4"
      />

      {photo.title && (
        <h1 className="text-2xl font-bold mb-2">{photo.title}</h1>
      )}
      {photo.takenAt && (
        <p className="text-sm text-gray-500 mb-2">
          撮影日: {new Date(photo.takenAt).toLocaleString()}
        </p>
      )}
      {photo.description && (
        <p className="text-base mb-2 line-clamp-3 whitespace-pre-wrap">
          {photo.description}
        </p>
      )}
    </div>
  );
};
