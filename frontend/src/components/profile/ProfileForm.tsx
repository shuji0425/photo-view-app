"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileParams, profileSchema } from "@/lib/schema/profileSchema";
import { useEffect, useState } from "react";
import AvatarUploader from "./AvatarUploader";
import toast from "react-hot-toast";
import { useAvatarUploader } from "@/hooks/useAvatarUploader";
import { ActionButton } from "../ui/ActionButton";
import { FormField } from "../ui/FormField";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";

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
      {/* Avatar */}
      <div>
        <label className="block text-sm font-medium">アイコン画像</label>
        <AvatarUploader
          onImageSelected={(blob) => setAvatarBlob(blob)}
          initialUrl={defaultValues?.avatar}
        />
      </div>

      {/* Bio */}
      <div>
        <FormField label="自己紹介" htmlFor="bio" error={errors.bio?.message}>
          <Textarea id="bio" rows={4} {...register("bio")} />
        </FormField>
      </div>

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

      {/* Location */}
      <div>
        <FormField
          label="所在地"
          htmlFor="location"
          error={errors.location?.message}
        >
          <Input id="location" {...register("location")} />
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
