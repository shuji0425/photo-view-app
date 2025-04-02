import { Profile } from "@/types/profile";
import { apiFetch } from "../client";

/**
 * プロフィールを取得（管理者の1番若いID）
 * @returns json
 */
export function fetchPublicAdminProfile(): Promise<Profile | null> {
  return apiFetch<Profile | null>(
    `${process.env.NEXT_PUBLIC_API_URL}/public/profile`,
    {
      next: { revalidate: 60 },
    }
  );
}
