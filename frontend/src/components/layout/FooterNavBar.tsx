"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft, Home, User } from "lucide-react";
import { cn } from "@/lib/utils/cn";

/**
 * フッターナビゲーション
 */
export const FooterNavBar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    {
      onclick: () => router.back(),
      icon: ArrowLeft,
      label: "戻る",
      isBack: true,
    },
    { href: "/", icon: Home, label: "ホーム" },
    { href: "/profile", icon: User, label: "プロフィール" },
  ];

  return (
    <nav
      role="navigation"
      className="fixed bottom-0 inset-x-0 bg-gray-200 border-gray-300 shadow-sm z-50"
    >
      <ul className="flex justify-around items-center h-14">
        {navItems.map(({ href, icon: Icon, label, onclick, isBack }) => (
          <li key={label}>
            {isBack ? (
              <button
                type="button"
                onClick={onclick}
                aria-label={label}
                className="flex flex-col items-center text-xs text-gray-500 cursor-pointer"
              >
                <Icon size={20} className="mb-1" />
                <span>{label}</span>
              </button>
            ) : (
              <Link
                href={href!}
                aria-label={label}
                className="flex flex-col items-center text-xs"
              >
                <Icon
                  size={20}
                  className={cn(
                    "mb-1",
                    pathname === href ? "text-blue-500" : "text-gray-500"
                  )}
                />
                <span
                  className={
                    pathname === href ? "text-blue-500" : "text-gray-500"
                  }
                >
                  {label}
                </span>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};
