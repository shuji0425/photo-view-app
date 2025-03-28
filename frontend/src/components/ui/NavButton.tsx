"use client";

import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import {
  baseButtonClass,
  colorClasses,
  ButtonColor,
} from "@/lib/styles/button";

type NavButtonProps = {
  href: string;
  label: string;
  color: ButtonColor;
};

/**
 * 遷移ボタン
 * blue   : 一般的なナビゲーション (例: 戻る, 遷移)
 * green  : データの作成・更新 (例: 編集, 変更を保存)
 * red    : 削除・ログアウトなどの注意喚起 (例: ログアウト, 削除)
 * yellow : 注意が必要なアクション (例: 未作成時の作成ボタン, 確認が必要な操作)
 */
export const NavButton = ({ href, label, color }: NavButtonProps) => {
  return (
    <Link href={href}>
      <button className={cn(baseButtonClass, colorClasses[color])}>
        {label}
      </button>
    </Link>
  );
};
