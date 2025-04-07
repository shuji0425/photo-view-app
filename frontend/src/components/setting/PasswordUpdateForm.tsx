"use client";

import { usePasswordUpdateForm } from "@/hooks/setting/usePasswordUpdateForm";
import { PasswordInput } from "../ui/PasswordInput";
import { FormField } from "../ui/FormField";
import { ActionButton } from "../ui/ActionButton";
import { BackButton } from "../ui/BackButton";
import { PasswordUpdateSchema } from "@/lib/schema/accountSchema";

type Props = {
  onSubmit: (data: PasswordUpdateSchema) => Promise<void>;
};

export const PasswordUpdateForm = ({ onSubmit }: Props) => {
  const { register, handleSubmit, errors, isSubmitting } =
    usePasswordUpdateForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* 現在のパスワード */}
      <FormField
        label="現在のパスワード"
        htmlFor="currentPassword"
        error={errors.currentPassword?.message}
      >
        <PasswordInput id="currentPassword" {...register("currentPassword")} />
      </FormField>

      {/* 新しいパスワード */}
      <FormField
        label="新しいパスワード"
        htmlFor="newPassword"
        error={errors.newPassword?.message}
      >
        <PasswordInput id="newPassword" {...register("newPassword")} />
      </FormField>

      {/* 確認用パスワード */}
      <FormField
        label="確認用パスワード"
        htmlFor="confirmNewPassword"
        error={errors.confirmNewPassword?.message}
      >
        <PasswordInput
          id="confirmNewPassword"
          {...register("confirmNewPassword")}
        />
      </FormField>

      {/* ボタンエリア */}
      <div className="flex justify-between pt-4">
        <BackButton />
        <ActionButton
          type="submit"
          label="変更する"
          color="green"
          disabled={isSubmitting}
          isLoading={isSubmitting}
        />
      </div>
    </form>
  );
};
