"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "ダッシュボード", path: "/admin/dashboard" },
  { name: "写真アップロード", path: "/admin/photos/upload" },
  { name: "プロフィール", path: "/admin/profile" },
];

/**
 * サイドバー
 */
export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <nav className="space-y-2">
      {navItems.map(({ name, path }) => (
        <Link
          key={path}
          href={path}
          className={`block px-3 py-2 rounded hover:bg-gray-200 ${
            pathname === path ? "bg-gray-300 font-bold" : ""
          }`}
        >
          {name}
        </Link>
      ))}
    </nav>
  );
}
