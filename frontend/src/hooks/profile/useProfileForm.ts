import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { ProfileParams, profileSchema } from "@/lib/schema/profileSchema";

interface UseProfileFormProps {
  defaultValues?: ProfileParams;
}

/**
 * useProfileForm
 * プロフィールフォームの入力状態・バリデーション・送信処理を管理するカスタムフック
 */
export const useProfileForm = ({ defaultValues }: UseProfileFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ProfileParams>({
    resolver: zodResolver(profileSchema),
    defaultValues,
  });

  // データ取得後に値を反映
  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  return {
    register,
    handleSubmit,
    reset,
    control,
    errors,
  };
};
