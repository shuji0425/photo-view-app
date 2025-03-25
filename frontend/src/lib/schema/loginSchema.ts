import { z } from "zod";

/**
 * ログイン用のバリデーション
 * - メールアドレス
 * - パスワード
 */
export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "正しいメールアドレスを入力してください" }),
  password: z
    .string()
    .min(6, { message: "6文字以上のパスワードを入力してください" }),
});

/** フォーム入力データの型 */
export type LoginFormSchema = z.infer<typeof loginSchema>;
