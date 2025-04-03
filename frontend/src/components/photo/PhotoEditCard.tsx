"use client";

import Image from "next/image";
import { Input } from "../ui/Input";
import { FormField } from "../ui/FormField";
import { Textarea } from "../ui/Textarea";
import { Select } from "../ui/Select";
import { DateInput } from "../ui/DateInput";
import { Toggle } from "../ui/Toggle";
import { useCategories } from "@/lib/swr/useCategories";
import { TagInput } from "../ui/TagInput";
import {
  PhotoUpdateParams,
  PhotoBulkUpdateParams,
} from "@/lib/schema/photoSchema";
import { Controller, UseFormRegister, Control } from "react-hook-form";
import { PhotoDetail } from "@/types/photo";
import { formatToDateJST } from "@/lib/utils/date";

type Props = {
  index: number;
  photo: PhotoDetail;
  register: UseFormRegister<PhotoBulkUpdateParams>;
  control: Control<PhotoBulkUpdateParams>;
  error?: Partial<Record<keyof PhotoUpdateParams, { message?: string }>>;
};

/**
 * 画像編集情報表示
 */
export const PhotoEditCard = ({
  index,
  photo,
  register,
  control,
  error,
}: Props) => {
  const { categories } = useCategories();
  // カテゴリ
  const categoryOptions = categories.map((cat) => ({
    label: cat.name,
    value: cat.id,
  }));

  return (
    <div className="border rounded p-4 mb-6 shadow-sm bg-white">
      <div className="relative w-full aspect-[4/3]">
        <Image
          src={photo.imageUrl}
          alt={`photo-${photo.id}`}
          fill
          className="object-contain rounded"
        />
        <input
          type="hidden"
          defaultValue={photo.id}
          {...register(`updates.${index}.photoId`, { valueAsNumber: true })}
          readOnly
        />
      </div>

      {/* タイトル */}
      <FormField
        label="タイトル"
        htmlFor={`title-${index}`}
        error={error?.title?.message}
      >
        <Input
          id={`title-${index}`}
          {...register(`updates.${index}.title`)}
          placeholder="タイトルを入力"
        />
      </FormField>

      {/* 説明文 */}
      <FormField
        label="説明文"
        htmlFor={`description-${index}`}
        error={error?.description?.message}
      >
        <Textarea
          id={`description-${index}`}
          rows={3}
          {...register(`updates.${index}.description`)}
        />
      </FormField>

      {/* カテゴリ */}
      <FormField
        label="カテゴリ"
        htmlFor={`category_id-${index}`}
        error={error?.categoryId?.message}
      >
        <Controller
          control={control}
          name={`updates.${index}.categoryId`}
          render={({ field }) => (
            <Select
              id={`category-id-${index}`}
              onChange={(e) => field.onChange(Number(e.target.value))}
              value={field.value ?? ""}
              options={categoryOptions}
            />
          )}
        />
      </FormField>

      {/* 撮影日 */}
      <FormField
        label="撮影日時"
        htmlFor={`taken-at-${index}`}
        error={error?.takenAt?.message}
      >
        <Controller
          control={control}
          name={`updates.${index}.takenAt`}
          render={({ field }) => (
            <DateInput
              id={`taken-at-${index}`}
              value={formatToDateJST(field.value)}
              onChange={(e) => field.onChange(e.target.value || null)}
            />
          )}
        />
      </FormField>

      {/* タグ */}
      <FormField
        label="タグ"
        htmlFor={`tags-${index}`}
        error={error?.tags?.message}
      >
        <Controller
          control={control}
          name={`updates.${index}.tags`}
          defaultValue={photo.tags ?? []}
          render={({ field }) => (
            <TagInput value={field.value ?? []} onChange={field.onChange} />
          )}
        />
      </FormField>

      {/* 表示フラグ */}
      <FormField
        label="公開する"
        htmlFor={`is-visible-${index}`}
        error={error?.isVisible?.message}
      >
        <Controller
          control={control}
          name={`updates.${index}.isVisible`}
          render={({ field }) => (
            <Toggle
              id={`is-visible-${index}`}
              checked={field.value}
              onChange={(checked: boolean) => field.onChange(checked)}
            />
          )}
        />
      </FormField>
    </div>
  );
};
