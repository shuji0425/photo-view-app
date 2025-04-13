import { getPublicPhotoById } from "@/lib/api/photo/getPublicById";
import { createGenericMetadata } from "@/lib/utils/seo";
import { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants/metadata";

/**
 * 写真詳細のメタデータ
 */
export const photoDetailMetadata = async (id: number): Promise<Metadata> => {
  const defaultTitle = `写真詳細 | ${SITE_NAME}`;
  if (isNaN(id)) {
    return {
      title: defaultTitle,
      description: "指定された写真が見つかりませんでした。",
    };
  }

  try {
    const photo = await getPublicPhotoById(id);
    return createGenericMetadata({
      title: photo.title ?? "写真詳細",
      description: photo.description ?? "ここは写真の詳細情報を閲覧できます。",
      imageUrl: photo.imageUrl,
      pathname: `/photo/${id}`,
      type: "article",
    });
  } catch {
    return {
      title: defaultTitle,
      description: "写真の取得中にエラーが発生しました。",
    };
  }
};
