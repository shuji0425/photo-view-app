"use client";

import { FormField } from "../ui/FormField";
import { Input } from "../ui/Input";
import { ActionButton } from "../ui/ActionButton";
import { PasswordInput } from "../ui/PasswordInput";
import { useLoginForm } from "@/hooks/useLoginForm";

/**
 * 管理者用ログインフォーム
 * @returns JSX.Element
 */
export const LoginForm = () => {
  const { register, handleSubmit, onSubmit, errors, isSubmitting, apiError } =
    useLoginForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-2xl font-bold mb-6 text-center">管理者ログイン</h1>

      {/* APIエラー表示 */}
      {apiError && <p className="text-red-500 text-sm mb-4">{apiError}</p>}

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
