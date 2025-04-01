import useSWR, { mutate } from "swr";
import { getMe, login as apiLogin, logout as apiLogout } from "@/lib/api/auth";
import { AuthUser, LoginParams } from "@/types/user";

export const useAuth = () => {
  const { data: user, error } = useSWR<AuthUser>("/me", getMe, {
    shouldRetryOnError: false,
  });

  // ログイン状態
  const isLoading = !user && !error;

  // ログイン処理
  const login = async (params: LoginParams) => {
    await apiLogin(params);
    await mutate("/me");
  };

  // ログアウト処理
  const logout = async () => {
    await apiLogout();
    mutate("/me", null, false); // useSWRのキャッシュクリア
  };

  return { user, isLoading, login, logout };
};
