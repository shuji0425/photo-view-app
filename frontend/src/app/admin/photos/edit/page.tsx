"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { usePhotoEditor } from "@/hooks/usePhotoEditor";
import { PhotoEditCard } from "@/components/photo/PhotoEditCard";
import toast from "react-hot-toast";
import { ActionButton } from "@/components/ui/ActionButton";
import { photoBulkUpdateSchema } from "@/lib/schema/photoSchema";
import { updatePhotos } from "@/lib/api/photo/bulkUpdate";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/**
 * 編集画面
 */
export default function PhotoEditPage() {
  const searchParams = useSearchParams();
  const ids = useMemo(() => {
    const idsParam = searchParams.get("ids");
    return idsParam ? idsParam.split(",").map(Number) : [];
  }, [searchParams]);

  const { photos, loading } = usePhotoEditor(ids);
  const router = useRouter();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof photoBulkUpdateSchema>>({
    resolver: zodResolver(photoBulkUpdateSchema),
    defaultValues: { updates: photos },
  });

  const { fields } = useFieldArray({ control, name: "updates" });

  useEffect(() => {
    reset({ updates: photos });
  }, [photos, reset]);

  const onSubmit = async (values: z.infer<typeof photoBulkUpdateSchema>) => {
    try {
      await updatePhotos(values);
      toast.success("更新が完了しました");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("更新に失敗しました");
    }
  };

  return (
    <>
      <h1 className="text-xl font-bold mb-6">画像の編集</h1>

      {loading && <p className="text-sm text-gray-500">読み込み中...</p>}
      {!loading && photos.length === 0 && (
        <p className="text-sm text-gray-500">編集対象の画像がありません</p>
      )}

      {fields.map((field, idx) => (
        <PhotoEditCard
          key={field.id}
          index={idx}
          register={register}
          photo={photos[idx]}
          error={errors.updates?.[idx]}
          control={control}
        />
      ))}

      {photos.length > 0 && (
        <ActionButton
          type="submit"
          color="green"
          label="すべて保存"
          onClick={handleSubmit(onSubmit)}
        />
      )}
    </>
  );
}
