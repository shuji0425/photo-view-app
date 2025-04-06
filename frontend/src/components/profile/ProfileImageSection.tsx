"use client";

import { FormField } from "../ui/FormField";
import { Input } from "../ui/Input";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { ProfileParams } from "@/lib/schema/profileSchema";
import AvatarUploader from "./AvatarUploader";

type Props = {
  register: UseFormRegister<ProfileParams>;
  errors: FieldErrors<ProfileParams>;
  onAvatarSelect: (blob: Blob | null) => void;
  initialAvatarUrl?: string | null;
  onAvatarDelete?: () => void;
};

/**
 * プロフィール画像・カバー画像セクション
 */
export const ProfileImageSection = ({
  register,
  errors,
  onAvatarSelect,
  initialAvatarUrl,
  onAvatarDelete,
}: Props) => {
  return (
    <section className="space-y-6">
      {/* プロフィール画像 */}
      <FormField label="アイコン画像" htmlFor="avatar">
        <AvatarUploader
          onImageSelected={onAvatarSelect}
          initialUrl={initialAvatarUrl ?? undefined}
          onAvatarDelete={onAvatarDelete}
        />
      </FormField>

      {/* カバー画像 */}
      <FormField
        label="カバー画像URL"
        htmlFor="cover-image"
        error={errors.coverImage?.message}
      >
        <Input
          id="cover-image"
          type="url"
          placeholder="https://example.com/cover.jpg"
          {...register("coverImage")}
        />
      </FormField>
    </section>
  );
};
