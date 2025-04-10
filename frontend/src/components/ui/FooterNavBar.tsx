"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, Share2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";

/**
 * フッターナビゲーション
 */
export const FooterNavBar = () => {
  const pathname = usePathname();

  const navItems = [
    { href: "/", icon: Home, label: "ホーム" },
    { href: "/profile", icon: User, label: "プロフィール" },
    { href: "/share", icon: Share2, label: "シェア" },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 bg-gray-100 border-gray-200 shadow-sm z-50">
      <ul className="flex justify-around items-center h-14">
        {navItems.map(({ href, icon: Icon, label }) => (
          <li key={href}>
            <Link href={href} className="flex flex-col items-center text-xs">
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
          </li>
        ))}
      </ul>
    </nav>
  );
};
