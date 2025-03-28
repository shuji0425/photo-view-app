"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileParams, profileSchema } from "@/lib/schema/profileSchema";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAvatarUploader } from "@/hooks/useAvatarUploader";
import { ActionButton } from "../ui/ActionButton";
import { FormField } from "../ui/FormField";
import { Input } from "../ui/Input";
import { ProfileBasicSection } from "./ProfileBasicSection";
import { ProfileImageSection } from "./ProfileImageSection";
import { ProfileLocationSection } from "./ProfileLocationSection";

type ProfileFormProps = {
  defaultValues?: ProfileParams;
  onSubmit: (data: ProfileParams) => Promise<void>;
  isSubmitting?: boolean;
  submitLabel: string;
  userId: number;
};

/**
 * プロフィールフォーム
 */
const ProfileForm = ({
  defaultValues,
  onSubmit,
  isSubmitting,
  submitLabel,
  userId,
}: ProfileFormProps) => {
  const [avatarBlob, setAvatarBlob] = useState<Blob | null>(null);
  const { uploadAvatar } = useAvatarUploader();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileParams>({
    resolver: zodResolver(profileSchema),
    defaultValues,
  });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  // ボタン押下の処理
  const handleFormSubmit = async (formData: ProfileParams) => {
    let avatarUrl = formData.avatar;

    const uploadedUrl = await uploadAvatar(userId, avatarBlob);
    if (uploadedUrl) avatarUrl = uploadedUrl;

    await onSubmit({ ...formData, avatar: avatarUrl });
    toast.success("プロフィールを更新しました！");
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* 自己紹介入力欄 */}
      <ProfileBasicSection register={register} errors={errors} />
      <ProfileImageSection
        register={register}
        errors={errors}
        onAvatarSelect={(blob) => setAvatarBlob(blob)}
        initialAvatarUrl={defaultValues?.avatar}
      />
      <ProfileLocationSection register={register} errors={errors} />

      {/* Website */}
      <div>
        <FormField
          label="ウェブサイト"
          htmlFor="website"
          error={errors.website?.message}
        >
          <Input id="website" type="url" {...register("website")} />
        </FormField>
      </div>

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
