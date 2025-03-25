import { useEffect, useState } from "react";
import { getMe, logout } from "@/lib/api/auth";
import { AuthUser } from "@/types/auth";

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 初回マウント時にユーザーを取得
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getMe();
        setUser(userData);
      } catch {
        setUser(null); // 未認証
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  // ログアウト処理
  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
    } catch (err) {
      console.error("ログアウトに失敗しました", err);
    }
  };

  return { user, isLoading, isLoggedIn: !!user, logout: handleLogout };
};
