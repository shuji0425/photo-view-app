export { profileMetadata as metadata } from "./metadata";

import { ProfileBio } from "@/components/profile/display/ProfileBio";
import { ProfileHeader } from "@/components/profile/display/ProfileHeader";
import { ProfileInfo } from "@/components/profile/display/ProfileInfo";
import { ProfileSNS } from "@/components/profile/display/ProfileSNS";
import { FooterNavBar } from "@/components/layout/FooterNavBar";
import { fetchPublicAdminProfile } from "@/lib/api/profile/public";
import { notFound } from "next/navigation";

// 表示部分
export default async function ProfilePage() {
  const profile = await fetchPublicAdminProfile();
  if (!profile || !profile.isPublic) return notFound();

  return (
    <div className="min-h-full flex-1 max-w-xl mx-auto px-6 py-8 bg-gray-100 text-gray-700">
      <main className="pb-16">
        <h2 className="text-2xl font-semibold mb-4">プロフィール</h2>
        <ProfileHeader profile={profile} />
        <ProfileBio bio={profile.bio} />
        <ProfileInfo
          website={profile.website}
          location={profile.location}
          birthPlace={profile.birthPlace}
        />
        <ProfileSNS links={profile.snsLinks} />
        <FooterNavBar />
      </main>
    </div>
  );
}
