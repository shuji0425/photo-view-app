import useSWR from "swr";
import { getProfile } from "../api/profile";
import { Profile } from "@/types/profile";

/**
 * ユーザーIDをもとにプロフィールを取得
 * @param userId ユーザーID
 * @returns object
 */
export const useProfile = (userId: number) => {
  const { data, error, mutate } = useSWR<Profile>(
    userId ? `/profiles/${userId}` : null,
    () => getProfile(userId)
  );

  return {
    profile: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
