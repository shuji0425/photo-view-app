import { AuthUser } from "@/types/user";
import { apiFetch } from "../client";

/**
 * ログイン中のユーザーを取得
 */
export const getMe = async (): Promise<AuthUser | null> => {
  return apiFetch<AuthUser | null>(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/me`
  );
};
