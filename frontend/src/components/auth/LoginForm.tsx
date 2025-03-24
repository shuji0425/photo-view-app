"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api/auth";
import { LoginFormSchema, loginSchema } from "@/lib/schema/loginSchema";

/**
 * 管理者用ログインフォーム
 * - フォームバリデーション（zod）
 * - ログインAPI呼び出し
 * - 成功時はダッシュボードに遷移
 * @returns JSX.Element
 */
export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormSchema>({ resolver: zodResolver(loginSchema) });

  const [apiError, setApiError] = useState("");
  const router = useRouter();

  // フォーム送信処理
  const onSubmit = async (data: LoginFormSchema) => {
    try {
      setApiError("");
      await login(data);
      router.push("/admin/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setApiError(err.message);
      } else {
        setApiError("ログインに失敗しました");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-sm"
    >
      <h1 className="text-2xl font-bold mb-6 text-center">管理者ログイン</h1>

      {/* メールアドレス入力 */}
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          メールアドレス
        </label>
        <input
          type="email"
          id="email"
          {...register("email")}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* パスワード入力 */}
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          パスワード
        </label>
        <input
          type="password"
          id="password"
          {...register("password")}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
        />
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* APIエラー表示 */}
      {apiError && <p className="text-red-500 text-sm mb-4">{apiError}</p>}

      {/* 送信ボタン */}
      <div className="flex items-center justify-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          {isSubmitting ? "ログイン中..." : "ログイン"}
        </button>
      </div>
    </form>
  );
};
