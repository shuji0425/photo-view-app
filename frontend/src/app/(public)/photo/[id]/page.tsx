import { getPublicPhotoById } from "@/lib/api/photo/getPublicById";
import { photoDetailMetadata } from "./metadata";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import PhotoDetailPage from "@/components/photo/display/PhotoDetailPage";

type Props = {
  params: Promise<{ id: string }>;
};

/**
 * 詳細ページのメタデータ
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const numericId = Number(id);
  if (Number.isNaN(numericId)) {
    return {
      title: "写真詳細 | Enframe",
      description: "無効なIDが指定されました。",
    };
  }

  return await photoDetailMetadata(numericId);
}

/**
 * 詳細ページ
 */
export default async function Page({ params }: Props) {
  const { id } = await params;
  const numericId = Number(id);
  if (Number.isNaN(numericId)) return notFound();

  const photo = await getPublicPhotoById(numericId).catch(() => null);
  if (!photo) return notFound();

  return <PhotoDetailPage initialPhoto={photo} />;
}
