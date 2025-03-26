import useSWR from "swr";
import { getMe } from "../api/auth";
import { AuthUser } from "@/types/auth";

/**
 * ログイン中のユーザー情報を取得
 * @returns object
 */
export const useUser = () => {
  const { data, error, mutate } = useSWR<AuthUser>("/me", getMe);

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
