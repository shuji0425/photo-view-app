"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

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
      <button
        onClick={handleLogout}
        disabled={isLoggingOut}
        className={`px-4 py-2 text-white rounded transition ${
          isLoggingOut
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-red-500  hover:bg-red-600"
        }`}
      >
        {isLoggingOut ? "ログアウト中..." : "ログアウト"}
      </button>
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </div>
  );
};

export default LogoutButton;
