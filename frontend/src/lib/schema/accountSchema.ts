import { z } from "zod";

/**
 * アカウントバリデーションスキーマ
 */
export const basicAccountSchema = z.object({
  username: z
    .string()
    .min(2, "ユーザー名は2文字以上で入力してください")
    .max(50, "ユーザー名は50文字以内で入力してください")
    .regex(/^[a-zA-Z0-9]+$/, "ユーザー名は英数字のみ使用できます"),
  email: z.string().min(6, "有効なメールアドレスを入力してください"),
  currentPassword: z.string().min(6, "現在のパスワードを入力してください"),
});

export type BasicAccountParams = z.infer<typeof basicAccountSchema>;
