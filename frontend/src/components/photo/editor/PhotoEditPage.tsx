"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { usePhotoEditor } from "@/hooks/photo/usePhotoEditor";
import { PhotoEditCard } from "@/components/photo/editor/PhotoEditCard";
import toast from "react-hot-toast";
import { ActionButton } from "@/components/ui/ActionButton";
import { photoBulkUpdateSchema } from "@/lib/schema/photoSchema";
import { updatePhotos } from "@/lib/api/photo/bulkUpdate";
import { useFieldArray } from "react-hook-form";
import { z } from "zod";
import { usePhotoEditForm } from "@/hooks/photo/usePhotoEditForm";
import { useCategories } from "@/lib/swr/useCategories";

/**
 * 編集画面
 */
export const PhotoEditPage = () => {
  // カテゴリ取得と整形
  const { categories } = useCategories();
  const categoryOptions = categories.map((cat) => ({
    label: cat.name,
    value: cat.id,
  }));

  const searchParams = useSearchParams();
  const ids = useMemo(() => {
    const idsParam = searchParams.get("ids");
    return idsParam ? idsParam.split(",").map(Number) : [];
  }, [searchParams]);

  const { photos, loading } = usePhotoEditor(ids);
  const router = useRouter();

  const { control, register, handleSubmit, errors, reset } = usePhotoEditForm(
    {}
  );

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
          categories={categoryOptions}
        />
      ))}

      {photos.length > 0 && (
        <div className="text-center">
          <ActionButton
            type="submit"
            color="green"
            label="すべて保存"
            onClick={handleSubmit(onSubmit)}
          />
        </div>
      )}
    </>
  );
};
