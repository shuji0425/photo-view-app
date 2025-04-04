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

      {/* メタ情報 */}
      <PhotoEditMetaFields
        index={index}
        control={control}
        categories={categories}
        error={error}
      />
    </div>
  );
};
