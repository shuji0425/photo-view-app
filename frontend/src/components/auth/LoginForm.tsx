"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { LoginFormSchema, loginSchema } from "@/lib/schema/loginSchema";
import { useAuth } from "@/hooks/useAuth";
import { FormField } from "../ui/FormField";
import { Input } from "../ui/Input";
import { ActionButton } from "../ui/ActionButton";
import { PasswordInput } from "../ui/PasswordInput";

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
  const { login } = useAuth();

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
        <FormField
          label="メールアドレス"
          htmlFor="email"
          error={errors.email?.message}
        >
          <Input
            id="email"
            type="email"
            {...register("email")}
            autoComplete="email"
          />
        </FormField>
      </div>

      {/* パスワード入力 */}
      <div className="mb-6">
        <FormField
          label="パスワード"
          htmlFor="password"
          error={errors.password?.message}
        >
          <PasswordInput
            id="password"
            {...register("password")}
            autoComplete="current-password"
          />
        </FormField>
      </div>

      {/* APIエラー表示 */}
      {apiError && <p className="text-red-500 text-sm mb-4">{apiError}</p>}

      {/* 送信ボタン */}
      <div className="flex items-center justify-center">
        <ActionButton
          label="ログイン"
          color="blue"
          type="submit"
          disabled={isSubmitting}
          isLoading={isSubmitting}
        />
      </div>
    </form>
  );
};
