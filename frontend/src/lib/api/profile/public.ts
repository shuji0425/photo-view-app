import { convertToProfile } from "@/lib/converters/profile";
import { UserProfileResponseDTO } from "@/types/dto/profile";
import { Profile } from "@/types/profile";

/**
 * プロフィールを取得（管理者の1番若いID）
 * @returns json
 */
export async function fetchPublicAdminProfile(): Promise<Profile | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/public/profile`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return null;

  const json: UserProfileResponseDTO = await res.json();

  // 変換して返却
  return convertToProfile(json);
}
