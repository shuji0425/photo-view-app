import { Profile } from "@/types/profile";

/**
 * プロフィールを取得
 * @param userId ユーザーID
 * @returns エラーの時は例外処理
 */
export const getProfile = async (userId: number): Promise<Profile> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/profiles/${userId}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "プロフィールの取得に失敗しました");
  }

  return res.json();
};
