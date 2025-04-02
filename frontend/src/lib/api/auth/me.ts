import { AuthUser } from "@/types/user";
import { apiFetch } from "../client";

/**
 * ログイン中のユーザーを取得
 */
export const getMe = async (): Promise<AuthUser> => {
  return apiFetch<AuthUser>(`${process.env.NEXT_PUBLIC_API_URL}/admin/me`);
};
