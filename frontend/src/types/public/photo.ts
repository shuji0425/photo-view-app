import { ExifInfo } from "../photoExif";
import { GPSInfo } from "../photoGps";
import { Tag } from "../tag";

// 基本の型
export type PublicPhoto = {
  id: number;
  url: string;
  aspectRatio: number;
  title?: string | null;
  description?: string | null;
  takenAt?: string | null;
  sortOrder: number;
};

// 詳細画面用
export type PublicPhotoDetail = {
  id: number;
  imageUrl: string;
  aspectRatio: number;
  title?: string | null;
  description?: string | null;
  takenAt?: string | null;
  exif?: ExifInfo;
  gps?: GPSInfo;
  tags: Tag[];
};
