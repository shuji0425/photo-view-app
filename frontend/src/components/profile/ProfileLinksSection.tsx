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
 * SNSリンク・Webサイトリンク入力セクション
 */
export const ProfileLinksSection = ({ register, errors }: Props) => {
  return (
    <section className="space-y-6">
      {/* SNSリンク（JSON形式） */}
      <FormField
        label="SNSリンク（Twitter, Instagramなど）"
        htmlFor="sns_links"
        error={errors.sns_links?.message}
      >
        <Textarea
          id="sns_links"
          rows={3}
          placeholder={`{"twitter": "https://twitter.com/xxxx", "instagram": "https://instagram.com/xxxx"}`}
          {...register("sns_links")}
        />
      </FormField>

      {/* ウェブサイト */}
      <FormField
        label="ウェブサイト"
        htmlFor="website"
        error={errors.website?.message}
      >
        <Input
          id="website"
          type="url"
          placeholder="https://example.com"
          {...register("website")}
        />
      </FormField>
    </section>
  );
};
