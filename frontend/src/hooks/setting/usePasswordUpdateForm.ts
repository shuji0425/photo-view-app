import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  passwordUpdateSchema,
  PasswordUpdateSchema,
} from "@/lib/schema/accountSchema";

/**
 * パスワード変更フォームの状態とバリデーションを管理
 */
export const usePasswordUpdateForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PasswordUpdateSchema>({
    resolver: zodResolver(passwordUpdateSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  return { register, handleSubmit, errors, isSubmitting };
};
