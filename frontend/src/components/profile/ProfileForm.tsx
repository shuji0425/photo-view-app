"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileParams, profileSchema } from "@/lib/schema/profileSchema";
import { useEffect } from "react";

type ProfileFormProps = {
  defaultValues?: ProfileParams;
  onSubmit: (data: ProfileParams) => Promise<void>;
  isSubmitting?: boolean;
  submitLabel: string;
};

/**
 * プロフィールフォーム
 */
const ProfileForm = ({
  defaultValues,
  onSubmit,
  isSubmitting,
  submitLabel,
}: ProfileFormProps) => {
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Avatar */}
      <div>
        <label htmlFor="avatar" className="block text-sm font-medium">
          プロフィール画像URL
        </label>
        <input
          id="avatar"
          type="text"
          {...register("avatar")}
          className="w-full mt-1 border rounded px-3 py-2"
        />
        {errors.avatar && (
          <p className="text-sm text-red-500 mt-1">{errors.avatar.message}</p>
        )}
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
        {errors.bio && (
          <p className="text-sm text-red-500 mt-1">{errors.bio.message}</p>
        )}
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
        {errors.website && (
          <p className="text-sm text-red-500 mt-1">{errors.website.message}</p>
        )}
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
        {errors.location && (
          <p className="text-sm text-red-500 mt-1">{errors.location.message}</p>
        )}
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
