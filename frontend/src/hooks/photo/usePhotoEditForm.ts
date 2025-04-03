import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import {
  PhotoBulkUpdateParams,
  photoBulkUpdateSchema,
} from "@/lib/schema/photoSchema";

interface UsePhotoEditFormProps {
  defaultValues?: PhotoBulkUpdateParams;
}

/**
 * usePhotoEditForm
 * 写真編集フォームの状態とバリデーションを管理するカスタムフック
 */
export const usePhotoEditForm = ({ defaultValues }: UsePhotoEditFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PhotoBulkUpdateParams>({
    resolver: zodResolver(photoBulkUpdateSchema),
    defaultValues,
  });

  // 初期化
  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  return {
    register,
    handleSubmit,
    control,
    reset,
    errors,
    isSubmitting,
  };
};
