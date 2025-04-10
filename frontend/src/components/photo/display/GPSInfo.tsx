"use client";

import { GPSInfo } from "@/types/photoGps";

type Props = {
  gps: GPSInfo;
};

/**
 * GPS情報を表示
 */
export const GPSInfoSection = ({ gps }: Props) => {
  if (!gps.latitude || !gps.longitude) return null;

  return (
    <div className="mt-6 rounded shadow p-4 text-sm">
      <h2 className="text-lg font-semibold mb-2">位置情報</h2>
      <p>緯度: {gps.latitude}</p>
      <p>経度: {gps.longitude}</p>
    </div>
  );
};
