"use client";

import { SafeMotion } from "@/components/ui/SafeMotion";
import { GPSInfo } from "@/types/photoGps";
import { MapPin } from "lucide-react";

type Props = {
  gps: GPSInfo;
};

/**
 * GPS情報を表示
 */
export const GPSInfoSection = ({ gps }: Props) => {
  if (!gps.latitude || !gps.longitude) return null;

  return (
    <SafeMotion
      className="mt-6 bg-white rounded shadow p-4 text-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-lg font-semibold mb-2">位置情報</h2>
      <ul className="space-y-1">
        <li className="flex items-center gap-2">
          <MapPin size={16} />
          <p>緯度: {gps.latitude}</p>
        </li>
        <li className="flex items-center gap-2">
          <MapPin size={16} />
          <p>経度: {gps.longitude}</p>
        </li>
      </ul>
    </SafeMotion>
  );
};
