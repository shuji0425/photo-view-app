"use client";

import Image from "next/image";
import { PhotoDetail } from "@/types/photo";
import { Input } from "../ui/Input";
import { FormField } from "../ui/FormField";
import { Textarea } from "../ui/Textarea";
import { Select } from "../ui/Select";
import { DateTimeInput } from "../ui/DateTimeInput";
import { Toggle } from "../ui/Toggle";
import { useCategories } from "@/lib/swr/useCategories";

type Props = {
  idx?: number;
  photo: PhotoDetail;
  onChange: <K extends keyof PhotoDetail>(
    field: keyof PhotoDetail,
    value: PhotoDetail[K]
  ) => void;
};

/**
 * 画像編集情報表示
 */
export const PhotoEditCard = ({ idx, photo, onChange }: Props) => {
  const { categories } = useCategories();
  // カテゴリ
  const categoryOptions = categories.map((cat) => ({
    label: cat.name,
    value: cat.id,
  }));

  return (
    <div className="border rounded p-4 mb-6 shadow-sm bg-white">
      <div className="relative w-full aspect-[4/3] mb-4">
        <Image
          src={photo.imageUrl}
          alt={`photo-${photo.id}`}
          fill
          className="object-contain rounded"
        />
      </div>

      {/* タイトル */}
      <FormField label="タイトル" htmlFor="title">
        <Input
          value={photo.title || ""}
          onChange={(e) => onChange("title", e.target.value)}
          placeholder="タイトルを入力"
        />
      </FormField>

      {/* 説明文 */}
      <FormField label="説明文" htmlFor="description">
        <Textarea
          value={photo.description || ""}
          onChange={(e) => onChange("description", e.target.value)}
          rows={3}
        />
      </FormField>

      {/* カテゴリ */}
      <FormField label="カテゴリ" htmlFor="category_id">
        <Select
          value={photo?.categoryId}
          onChange={(v) => onChange("categoryId", v)}
          options={categoryOptions}
        />
      </FormField>

      {/* 撮影日 */}
      <FormField label="撮影日時" htmlFor="taken_at">
        <DateTimeInput
          value={
            photo.takenAt
              ? new Date(photo.takenAt).toISOString().slice(0, 16)
              : ""
          }
          onChange={(v) => onChange("takenAt", v)}
        />
      </FormField>

      {/* 表示フラグ */}
      <FormField label="公開する" htmlFor={`is_visible_${idx}`}>
        <Toggle
          id={`is_visible_${idx}`}
          checked={photo.isVisible}
          onChange={(v) => onChange("isVisible", v)}
        />
      </FormField>
    </div>
  );
};
