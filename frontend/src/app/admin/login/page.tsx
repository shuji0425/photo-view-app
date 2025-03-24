"use client";

import { LoginForm } from "@/components/auth/LoginForm";

/**
 * 管理者用ログインページ
 * @returns JSX.Element
 */
export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <LoginForm />
    </div>
  );
}
