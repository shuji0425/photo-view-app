import { LoginRequest, LoginResponse } from "@/types/user";
import { apiFetch } from "../client";

/**
 * ログインAPI
 * @param data ログイン用のパラメータ
 * @throws エラーの時は例外処理
 */
export const login = (data: LoginRequest): Promise<LoginResponse> => {
  return apiFetch<LoginResponse, LoginRequest>(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
    {
      method: "POST",
      body: data,
    }
  );
};
