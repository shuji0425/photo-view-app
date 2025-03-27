import { Profile, ProfileParams } from "@/types/profile";

/**
 * プロフィール作成
 * @param userId ユーザーID
 * @param params 登録内容
 * @returns 作成されたプロフィール
 */
export const createProfile = async (
  userId: number,
  params: ProfileParams
): Promise<Profile> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/profiles/${userId}`,
    {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    }
  );

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "プロフィールの作成に失敗しました");
  }

  return res.json();
};
