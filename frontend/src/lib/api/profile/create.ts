import { ProfileParams } from "@/lib/schema/profileSchema";
import { Profile } from "@/types/profile";
import { apiFetch } from "../client";

/**
 * プロフィール作成
 * @param userId ユーザーID
 * @param params 登録内容
 * @returns 作成されたプロフィール
 */
export const createProfile = (
  userId: number,
  params: ProfileParams
): Promise<Profile> => {
  return apiFetch<Profile>(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/profiles/${userId}`,
    {
      method: "POST",
      body: params,
    }
  );
};
