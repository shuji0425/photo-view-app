import { ProfileParams } from "@/lib/schema/profileSchema";
import { Profile } from "@/types/profile";
import { apiFetch } from "../client";

/**
 * プロフィールの更新
 * @param userId ユーザーID
 * @param params 更新内容
 * @returns 更新後のプロフィール
 */
export const updateProfile = (
  userId: number,
  params: ProfileParams
): Promise<Profile> => {
  return apiFetch<Profile>(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/profiles/${userId}`,
    {
      method: "PUT",
      body: params,
    }
  );
};
