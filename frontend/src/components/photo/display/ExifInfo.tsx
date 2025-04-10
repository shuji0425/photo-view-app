"use client";

import { ExifInfo } from "@/types/photoExif";
import { motion } from "framer-motion";
import {
  Aperture,
  Calendar,
  Camera,
  RotateCw,
  Ruler,
  Timer,
  Wand2,
} from "lucide-react";
import { JSX } from "react";

type Props = {
  exif: ExifInfo;
};

/**
 * Exif情報の表示
 */
export const ExifInfoSection = ({ exif }: Props) => {
  const exifEntries: {
    icon: JSX.Element;
    label: string;
    value?: string | number;
  }[] = [
    {
      icon: <Camera size={16} />,
      label: "カメラメーカー",
      value: exif.cameraMake,
    },
    {
      icon: <Camera size={16} />,
      label: "カメラ機種",
      value: exif.cameraModel,
    },
    { icon: <Wand2 size={16} />, label: "レンズ", value: exif.lensModel },
    { icon: <Aperture size={16} />, label: "ISO感度", value: exif.iso },
    {
      icon: <Aperture size={16} />,
      label: "絞り値",
      value: exif.fNumber ? `f/${exif.fNumber}` : undefined,
    },
    {
      icon: <Timer size={16} />,
      label: "シャッタースピード",
      value: exif.exposureTime,
    },
    { icon: <Ruler size={16} />, label: "焦点距離", value: exif.focalLength },
    {
      icon: <Wand2 size={16} />,
      label: "ホワイトバランス",
      value: exif.whiteBalance,
    },
    {
      icon: <RotateCw size={16} />,
      label: "画像の向き",
      value: exif.orientation,
    },
    {
      icon: <Calendar size={16} />,
      label: "撮影日時",
      value: exif.takenAt ? new Date(exif.takenAt).toLocaleString() : undefined,
    },
  ];

  return (
    <motion.div
      className="mt-6 bg-white rounded shadow p-4 text-sm text-gray-800"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-lg font-semibold mb-2">撮影情報</h2>
      <ul className="space-y-1">
        {exifEntries
          .filter((entry) => entry.value !== undefined && entry.value !== null)
          .map((entry, idx) => (
            <li key={idx} className="flex items-center gap-2">
              {entry.icon}
              <span className="font-medium">{entry.label}:</span>
              <span>{entry.value}</span>
            </li>
          ))}
      </ul>
    </motion.div>
  );
};
