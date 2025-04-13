// app/profile/metadata.ts
import { fetchPublicAdminProfile } from "@/lib/api/profile/public";
import { SITE_URL } from "@/lib/constants/metadata";
import { createGenericMetadata } from "@/lib/utils/seo";
import { Metadata } from "next";

/**
 * /profile ページのメタデータ（SEO）
 */
export const profileMetadata = async (): Promise<Metadata> => {
  const metaTitle = "プロフィール";
  try {
    const profile = await fetchPublicAdminProfile();
    return createGenericMetadata({
      title: metaTitle,
      description: profile?.bio ?? "プロフィールです。",
      imageUrl: profile?.avatar ?? `${SITE_URL}/default-avatar.webp`,
      pathname: `/profile`,
      type: "profile",
    });
  } catch {
    return {
      title: metaTitle,
      description: "プロフィールの取得中にエラーが発生しました。",
    };
  }
};
