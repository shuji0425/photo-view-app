import { apiFetch } from "../client";

/**
 * ログアウトAPI
 * JWT Cookieを削除するための処理
 */
export const logout = (): Promise<{ message: string }> => {
  return apiFetch<{ message: string }>(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
    {
      method: "POST",
    }
  );
};
