import { PublicPhoto } from "@/types/public/photo";

type Props = {
  photo: PublicPhoto;
};

// 説明表示
export default function PhotoDetails({ photo }: Props) {
  return (
    <div className="px-2 space-y-1 text-sm text-gray-800">
      {photo.title && (
        <h2 className="text-xl font-semibold tracking-wide text-gray-900 mb-2">
          {photo.title}
        </h2>
      )}
      {/* {photo.location && (
          <p className="text-xs mb-1 text-gray-600">📍 {photo.location}</p>
        )}
        {photo.date && (
          <p className="text-xs mb-2 text-gray-600">📅 {photo.date}</p>
        )}
        {photo.description && (
          <p className="text-sm mb-3 leading-relaxed">{photo.description}</p>
      )} */}
      <p className="text-gray-600">写真の説明はここに入ります。</p>
      {/* 撮影位置追加できる */}
    </div>
  );
}
