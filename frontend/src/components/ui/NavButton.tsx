"use client";

import Link from "next/link";

type NavButtonProps = {
  href: string;
  label: string;
  color: "blue" | "green" | "red" | "yellow";
};

/**
 * 遷移ボタン
 * blue   : 一般的なナビゲーション (例: 戻る, 遷移)
 * green  : データの作成・更新 (例: 編集, 変更を保存)
 * red    : 削除・ログアウトなどの注意喚起 (例: ログアウト, 削除)
 * yellow : 注意が必要なアクション (例: 未作成時の作成ボタン, 確認が必要な操作)
 */
const NavButton = ({ href, label, color }: NavButtonProps) => {
  const colorClass = {
    blue: "bg-blue-500 hover:bg-blue-600",
    green: "bg-green-500 hover:bg-green-600",
    red: "bg-red-500 hover:bg-red-600",
    yellow: "bg-yellow-500 hover:bg-yellow-600",
  };

  return (
    <Link href={href}>
      <button
        className={`${colorClass[color]} text-white font-semibold py-2 px-4 rounded`}
      >
        {label}
      </button>
    </Link>
  );
};

export default NavButton;
