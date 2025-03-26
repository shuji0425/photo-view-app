import { useState, useEffect } from "react";
import { getMe } from "@/lib/api/auth";
import { AuthUser } from "@/types/auth";

/**
 * ログイン済みユーザーを取得
 * @returns object
 */
export function useUser() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getMe();
        setUser(userData);
      } catch (error) {
        console.error("ユーザー取得に失敗:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  return { user, isLoading, isError };
}
