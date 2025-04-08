// app/profile/metadata.ts
import { fetchPublicAdminProfile } from "@/lib/api/profile/public";
import { Metadata } from "next";

/**
 * /profile ページのメタデータ（SEO）
 */
export async function generateMetadata(): Promise<Metadata> {
  const profile = await fetchPublicAdminProfile();

  if (!profile || !profile.isPublic) {
    return {
      title: "プロフィール",
      description: "公開プロフィールが設定されていません。",
    };
  }

  return {
    title: `${profile.displayName} | プロフィール`,
    description: profile.bio || "公開プロフィールです。",
    openGraph: {
      title: `${profile.displayName} | プロフィール`,
      description: profile.bio || "公開プロフィールです。",
      images: profile.coverImage ? [profile.coverImage] : undefined,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/profile`,
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title: `${profile.displayName} | プロフィール`,
      description: profile.bio || "公開プロフィールです。",
      images: profile.coverImage ? [profile.coverImage] : undefined,
    },
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"
    ),
  };
}
