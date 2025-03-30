"use client";

import Image from "next/image";
import { PhotoDetail } from "@/types/photo";
import { Input } from "../ui/Input";
import { FormField } from "../ui/FormField";
import { Textarea } from "../ui/Textarea";

type Props = {
  photo: PhotoDetail;
  onChange: (field: keyof PhotoDetail, value: string) => void;
};

export const PhotoEditCard = ({ photo, onChange }: Props) => {
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
    </div>
  );
};
