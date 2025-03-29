"use client";

import { FormField } from "../ui/FormField";
import { Input } from "../ui/Input";
import {
  UseFormRegister,
  FieldErrors,
  useFieldArray,
  Control,
  useWatch,
} from "react-hook-form";
import { ProfileParams } from "@/lib/schema/profileSchema";
import { ActionButton } from "../ui/ActionButton";
import { FormError } from "../ui/FormError";

type Props = {
  register: UseFormRegister<ProfileParams>;
  control: Control<ProfileParams>;
  errors: FieldErrors<ProfileParams>;
};

/**
 * SNSリンク・Webサイトリンク入力セクション
 */
export const ProfileLinksSection = ({ register, control, errors }: Props) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sns_links",
  });
  const watchedPlatforms = useWatch({
    control,
    name: "sns_links",
  });

  return (
    <section className="space-y-6">
      {/* SNSリンク（複数追加可能） */}
      <div>
        <label className="block font-medium text-sm mb-2">SNSリンク</label>
        <div className="space-y-4">
          {fields.map((filed, index) => (
            <div key={filed.id} className="flex items-center gap-2">
              {/* プラットフォーム選択 */}
              <select
                {...register(`sns_links.${index}.platform`)}
                className="border rounded px-2 py-1"
              >
                <option value="twitter">Twitter</option>
                <option value="instagram">Instagram</option>
                <option value="facebook">Facebook</option>
                <option value="other">その他</option>
              </select>

              {/* その他の時は表示 */}
              {watchedPlatforms?.[index]?.platform === "other" && (
                <Input
                  placeholder="プラットフォーム名"
                  {...register(`sns_links.${index}.platform_name`)}
                />
              )}

              {/* URL */}
              <Input
                placeholder="URL"
                type="url"
                {...register(`sns_links.${index}.url`)}
              />
              <ActionButton
                label="削除"
                type="button"
                color="red"
                onClick={() => remove(index)}
                className="text-sm"
              />
            </div>
          ))}
        </div>
        <ActionButton
          label="+ SNSリンクを追加"
          type="button"
          color="blue"
          className="mt-2"
          onClick={() => append({ platform: "twitter", url: "" })}
        />
        <FormError message={errors.sns_links?.message} />
      </div>

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
