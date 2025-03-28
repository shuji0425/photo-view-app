"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileParams, profileSchema } from "@/lib/schema/profileSchema";
import { useEffect, useState } from "react";
import AvatarUploader from "./AvatarUploader";
import toast from "react-hot-toast";
import { useAvatarUploader } from "@/hooks/useAvatarUploader";
import { FormError } from "../ui/FormError";

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
        <label htmlFor="avatar" className="block text-sm font-medium">
          アイコン画像
        </label>
        <AvatarUploader
          onImageSelected={(blob) => setAvatarBlob(blob)}
          initialUrl={defaultValues?.avatar}
        />
      </div>

      {/* Bio */}
      <div>
        <label htmlFor="bio" className="block text-sm font-medium">
          自己紹介
        </label>
        <textarea
          id="bio"
          rows={4}
          {...register("bio")}
          className="w-full mt-1 border rounded px-3 py-2"
        />
        <FormError message={errors.bio?.message} />
      </div>

      {/* Website */}
      <div>
        <label htmlFor="website" className="block text-sm font-medium">
          ウェブサイト
        </label>
        <input
          id="website"
          type="url"
          {...register("website")}
          className="w-full mt-1 border rounded px-3 py-2"
        />
        <FormError message={errors.website?.message} />
      </div>

      {/* Location */}
      <div>
        <label htmlFor="location" className="block text-sm font-medium">
          所在地
        </label>
        <input
          id="location"
          type="text"
          {...register("location")}
          className="w-full mt-1 border rounded px-3 py-2"
        />
        <FormError message={errors.location?.message} />
      </div>

      {/* Submit */}
      <div className="text-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
