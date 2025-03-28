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
};

/**
 * プロフィール画像・カバー画像セクション
 */
export const ProfileImageSection = ({
  register,
  errors,
  onAvatarSelect,
  initialAvatarUrl,
}: Props) => {
  return (
    <section className="space-y-6">
      {/* プロフィール画像 */}
      <FormField label="アイコン画像" htmlFor="avatar">
        <AvatarUploader
          onImageSelected={onAvatarSelect}
          initialUrl={initialAvatarUrl ?? undefined}
        />
      </FormField>

      {/* カバー画像 */}
      <FormField
        label="カバー画像URL"
        htmlFor="cover_image"
        error={errors.cover_image?.message}
      >
        <Input
          id="cover_image"
          type="url"
          placeholder="https://example.com/cover.jpg"
          {...register("cover_image")}
        />
      </FormField>
    </section>
  );
};
