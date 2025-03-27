import { z } from "zod";

export const profileSchema = z.object({
  avatar: z
    .string()
    .optional()
    .nullable()
    .transform((val) => (val === "" ? null : val)),
  bio: z
    .string()
    .max(500, { message: "500文字以内で入力してください" })
    .optional()
    .nullable()
    .transform((val) => (val === "" ? null : val)),
  website: z
    .string()
    .optional()
    .nullable()
    .transform((val) => (val === "" ? null : val)),
  location: z
    .string()
    .max(100, { message: "100文字以内で入力してください" })
    .optional()
    .nullable()
    .transform((val) => (val === "" ? null : val)),
});

/** フォーム入力データ型 */
export type ProfileParams = z.infer<typeof profileSchema>;
