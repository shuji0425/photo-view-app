import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import {
  basicAccountSchema,
  BasicAccountParams,
} from "@/lib/schema/accountSchema";

/**
 * アカウント情報変更フォームの入力状態・バリデーション・送信処理を管理
 * @param defaultValues 初期値
 * @returns object
 */
export const useBasicAccountForm = (defaultValues?: BasicAccountParams) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BasicAccountParams>({
    resolver: zodResolver(basicAccountSchema),
    defaultValues,
  });

  // 初期値の反映
  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  return { register, handleSubmit, reset, errors, isSubmitting };
};
