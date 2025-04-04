import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginParams } from "@/lib/schema/loginSchema";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./useAuth";

/**
 * ログインフォームの状態・バリデーション・送信処理
 * @returns object
 */
export const useLoginForm = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginParams>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginParams) => {
    try {
      setApiError("");
      await login(data);
      router.push("/admin/dashboard");
    } catch {
      setApiError("メールアドレスまたはパスワードが間違っています");
    }
  };

  return { register, handleSubmit, onSubmit, errors, isSubmitting, apiError };
};
