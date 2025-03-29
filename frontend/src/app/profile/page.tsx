import { ProfileBio } from "@/components/profile/display/ProfileBio";
import { ProfileHeader } from "@/components/profile/display/ProfileHeader";
import { ProfileInfo } from "@/components/profile/display/ProfileInfo";
import { ProfileSNS } from "@/components/profile/display/ProfileSNS";
import { fetchPublicAdminProfile } from "@/lib/api/profile/public";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const revalidate = 60;

// メタデータ
export async function generateMetadata(): Promise<Metadata> {
  const profile = await fetchPublicAdminProfile();
  if (!profile) return { title: "プロフィール | 未公開" };

  return {
    title: `${profile.displayName} | 作家プロフィール`,
    description: profile.bio || `${profile.displayName} のプロフィールページ`,
    openGraph: {
      title: `${profile.displayName} | 作家プロフィール`,
      description: profile.bio || "",
      images: [profile.coverImage || "/og-default.jpg"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${profile.displayName} | 作家プロフィール`,
      description: profile.bio || "",
      images: [profile.coverImage || "/og-default.jpg"],
    },
  };
}

// 表示部分
export default async function ProfilePage() {
  const profile = await fetchPublicAdminProfile();
  if (!profile || !profile.isPublic) return notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <ProfileHeader profile={profile} />
      <ProfileBio bio={profile.bio} />
      <ProfileInfo
        website={profile.website}
        location={profile.location}
        birthPlace={profile.birthPlace}
      />
      <ProfileSNS links={profile.snsLinks} />
    </div>
  );
}
