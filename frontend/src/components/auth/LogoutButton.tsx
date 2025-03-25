"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type LogoutButtonProps = {
  onLogout: () => Promise<void>;
};

const LogoutButton = ({ onLogout }: LogoutButtonProps) => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleLogout = async () => {
    try {
      await onLogout();
      router.push("/admin/login");
    } catch (err) {
      console.error("ログアウト失敗:", err);
      setError("ログアウトに失敗しました。再試行してください。");
    }
  };

  return (
    <div className="mb-2">
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        ログアウト
      </button>
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </div>
  );
};

export default LogoutButton;
