"use client";

import { FormField } from "../ui/FormField";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { ProfileParams } from "@/lib/schema/profileSchema";

type Props = {
  register: UseFormRegister<ProfileParams>;
  errors: FieldErrors<ProfileParams>;
};

/**
 * 表示名・肩書き・自己紹介など基本情報セクション
 */
export const ProfileBasicSection = ({ register, errors }: Props) => {
  return (
    <section className="space-y-6">
      {/* 表示名（必須） */}
      <FormField
        label="表示名（作家名など）"
        htmlFor="display_name"
        error={errors.displayName?.message}
      >
        <Input id="display_name" {...register("displayName")} />
      </FormField>

      {/* 肩書き */}
      <FormField
        label="肩書き・職種"
        htmlFor="job_title"
        error={errors.jobTitle?.message}
      >
        <Input
          id="job_title"
          placeholder="例: 風景写真家 / デザイナー"
          {...register("jobTitle")}
        />
      </FormField>

      {/* 自己紹介 */}
      <FormField label="自己紹介" htmlFor="bio" error={errors.bio?.message}>
        <Textarea
          id="bio"
          rows={5}
          placeholder="活動内容や得意ジャンルなどを自由にご記入ください"
          {...register("bio")}
        />
      </FormField>
    </section>
  );
};
