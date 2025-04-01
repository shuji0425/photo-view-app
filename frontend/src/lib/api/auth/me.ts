import { AuthUser } from "@/types/auth";

export const getMe = async (): Promise<AuthUser> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/me`, {
    method: "GET",
    credentials: "include", // JWT Cookieも送信
  });

  // エラーの時は例外処理
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "ユーザー情報の取得に失敗しました");
  }

  // 成功時はユーザー情報を返却
  const data: AuthUser = await res.json();
  return data;
};
