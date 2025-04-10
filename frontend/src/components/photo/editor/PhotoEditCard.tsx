"use client";

import Image from "next/image";
import { Input } from "../../ui/Input";
import { FormField } from "../../ui/FormField";
import { Textarea } from "../../ui/Textarea";
import {
  PhotoUpdateParams,
  PhotoBulkUpdateParams,
} from "@/lib/schema/photoSchema";
import { UseFormRegister, Control } from "react-hook-form";
import { PhotoDetail } from "@/types/photo";
import { CategoryOption } from "@/types/category";
import { PhotoEditMetaFields } from "./PhotoEditMetaFields";

// 引数
type Props = {
  index: number;
  photo: PhotoDetail;
  register: UseFormRegister<PhotoBulkUpdateParams>;
  control: Control<PhotoBulkUpdateParams>;
  error?: Partial<Record<keyof PhotoUpdateParams, { message?: string }>>;
  categories: CategoryOption[];
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
  categories,
}: Props) => {
  return (
    <section className="border rounded p-6 mb-8 shadow-sm bg-white max-w-screen-md mx-auto">
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded">
        {/* 画像 */}
        <Image
          src={photo.imageUrl}
          alt={`photo-${photo.id}`}
          fill
          className="object-contain rounded"
        />
        {/* 非表示の photoId フィールド */}
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
          rows={2}
          {...register(`updates.${index}.description`)}
        />
      </FormField>

      {/* メタ情報 */}
      <PhotoEditMetaFields
        index={index}
        control={control}
        categories={categories}
        error={error}
      />
    </section>
  );
};
