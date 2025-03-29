import { ProfileParams } from "@/lib/schema/profileSchema";
import { Profile } from "@/types/profile";

/**
 * プロフィールの更新
 * @param userId ユーザーID
 * @param params 更新内容
 * @returns 更新後のプロフィール
 */
export const updateProfile = async (
  userId: number,
  params: ProfileParams
): Promise<Profile> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/profiles/${userId}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(params),
    }
  );

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "プロフィールの更新に失敗しました");
  }

  return res.json();
};
