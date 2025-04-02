import { Profile } from "@/types/profile";
import { apiFetch } from "../client";

/**
 * プロフィールを取得
 * @param userId ユーザーID
 * @returns エラーの時は例外処理
 */
export const getProfile = async (userId: number): Promise<Profile> => {
  try {
    return await apiFetch<Profile>(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/profiles/${userId}`
    );
  } catch {
    throw new Error("プロフィールの取得に失敗しました");
  }
};
