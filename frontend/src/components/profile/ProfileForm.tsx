"use client";

import { ProfileParams } from "@/lib/schema/profileSchema";
import { useState } from "react";
import { useAvatarUploaderMutation } from "@/hooks/useAvatarUploaderMutation";
import { ActionButton } from "../ui/ActionButton";
import { ProfileBasicSection } from "./ProfileBasicSection";
import { ProfileImageSection } from "./ProfileImageSection";
import { ProfileLocationSection } from "./ProfileLocationSection";
import { ProfileLinksSection } from "./ProfileLinksSection";
import { useProfileForm } from "@/hooks/profile/useProfileForm";

type ProfileFormProps = {
  defaultValues?: ProfileParams;
  onSubmit: (data: ProfileParams) => Promise<void>;
  isSubmitting?: boolean;
  submitLabel: string;
  userId: number;
};

/**
 * プロフィール編集・作成に共通で使用されるフォーム
 */
const ProfileForm = ({
  defaultValues,
  onSubmit,
  isSubmitting,
  submitLabel,
  userId,
}: ProfileFormProps) => {
  const [avatarBlob, setAvatarBlob] = useState<Blob | null>(null);
  const { uploadAvatar } = useAvatarUploaderMutation();
  const { register, handleSubmit, control, errors } = useProfileForm({
    defaultValues,
  });

  // ボタン押下の処理(画像アップロード)
  const handleFormSubmit = async (formData: ProfileParams) => {
    let avatarUrl = formData.avatar;

    // 画像アップロードが先
    const uploadedUrl = await uploadAvatar(userId, avatarBlob);
    if (uploadedUrl) avatarUrl = uploadedUrl;

    await onSubmit({ ...formData, avatar: avatarUrl });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* 自己紹介入力欄 */}
      <ProfileBasicSection register={register} errors={errors} />

      {/* プロフィール画像 */}
      <ProfileImageSection
        register={register}
        errors={errors}
        onAvatarSelect={(blob) => setAvatarBlob(blob)}
        initialAvatarUrl={defaultValues?.avatar}
      />

      {/* 住所・地域 */}
      <ProfileLocationSection register={register} errors={errors} />

      {/* SNSリンク */}
      <ProfileLinksSection
        register={register}
        errors={errors}
        control={control}
      />

      {/* Submit */}
      <div className="text-center">
        <ActionButton
          type="submit"
          color="green"
          label={submitLabel}
          disabled={isSubmitting}
          isLoading={isSubmitting}
        />
      </div>
    </form>
  );
};

export default ProfileForm;
