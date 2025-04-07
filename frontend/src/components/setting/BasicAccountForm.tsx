"use client";

import { FormField } from "../ui/FormField";
import { Input } from "../ui/Input";
import { PasswordInput } from "../ui/PasswordInput";
import { ActionButton } from "../ui/ActionButton";
import { BasicAccountParams } from "@/lib/schema/accountSchema";
import { useBasicAccountForm } from "@/hooks/setting/useBasicAccountForm";
import { BackButton } from "../ui/BackButton";

type Props = {
  defaultValues: BasicAccountParams;
  onSubmit: (data: BasicAccountParams) => Promise<void>;
};

/**
 * 基本情報変更フォーム
 */
export const BasicAccountForm = ({ defaultValues, onSubmit }: Props) => {
  const { register, handleSubmit, errors, isSubmitting } =
    useBasicAccountForm(defaultValues);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* ユーザー名 */}
      <FormField
        label="ユーザー名（英数字のみ）"
        htmlFor="username"
        error={errors.username?.message}
      >
        <Input id="username" {...register("username")} />
      </FormField>

      {/* メールアドレス */}
      <FormField
        label="メールアドレス"
        htmlFor="email"
        error={errors.email?.message}
      >
        <Input id="email" type="email" {...register("email")} />
      </FormField>

      {/* 現在のパスワード */}
      <FormField
        label="現在のパスワード"
        htmlFor="currentPassword"
        error={errors.currentPassword?.message}
      >
        <PasswordInput id="currentPassword" {...register("currentPassword")} />
      </FormField>

      {/* ボタンエリア */}
      <div className="flex justify-between pt-4">
        {/* 戻る */}
        <BackButton />

        {/* 保存ボタン */}
        <ActionButton
          type="submit"
          color="green"
          label="保存する"
          disabled={isSubmitting}
          isLoading={isSubmitting}
        />
      </div>
    </form>
  );
};
