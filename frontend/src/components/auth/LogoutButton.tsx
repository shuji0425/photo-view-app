"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ActionButton } from "../ui/ActionButton";

type LogoutButtonProps = {
  onLogout: () => Promise<void>;
};

const LogoutButton = ({ onLogout }: LogoutButtonProps) => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      setError(null);
      await onLogout();

      // ログインへリダイレクト
      router.push("/admin/login");
    } catch (err) {
      console.error("ログアウト失敗:", err);
      setError("ログアウトに失敗しました。再試行してください。");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="mb-2">
      <ActionButton
        label="ログアウト"
        color="red"
        disabled={isLoggingOut}
        isLoading={isLoggingOut}
        onClick={handleLogout}
      />
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </div>
  );
};

export default LogoutButton;
