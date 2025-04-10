"use client";

import { ExifInfo } from "@/types/photoExif";

type Props = {
  exif: ExifInfo;
};

/**
 * Exif情報の表示
 */
export const ExifInfoSection = ({ exif }: Props) => {
  const exifEntries: { label: string; value?: string | number }[] = [
    { label: "カメラメーカー", value: exif.cameraMake },
    { label: "カメラ機種", value: exif.cameraModel },
    { label: "レンズ", value: exif.lensModel },
    { label: "ISO感度", value: exif.iso },
    { label: "絞り値", value: exif.fNumber ? `f/${exif.fNumber}` : undefined },
    { label: "シャッタースピード", value: exif.exposureTime },
    { label: "焦点距離", value: exif.focalLength },
    { label: "ホワイトバランス", value: exif.whiteBalance },
    { label: "画像の向き", value: exif.orientation },
    {
      label: "撮影日時",
      value: exif.takenAt ? new Date(exif.takenAt).toLocaleString() : undefined,
    },
  ];

  return (
    <div className="mt-6 bg-white rounded shadow p-4 text-sm text-gray-800">
      <h2 className="text-lg font-semibold mb-2">撮影情報</h2>
      <ul className="space-y-1">
        {exifEntries
          .filter((entry) => entry.value !== undefined && entry.value !== null)
          .map((entry, idx) => (
            <li key={idx}>
              <span className="font-medium">{entry.label}:</span>
              {entry.value}
            </li>
          ))}
      </ul>
    </div>
  );
};
