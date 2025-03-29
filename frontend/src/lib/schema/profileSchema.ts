import { z } from "zod";

// SNSの定義
const snsLinksSchema = z.object({
  platform: z.enum(["twitter", "instagram", "facebook", "other"]),
  url: z.string().url("正しいURLを入力してください"),
  platform_name: z.string().optional(), // otherのみ
});

export const profileSchema = z.object({
  display_name: z
    .string()
    .min(1, { message: "表示名は必須です" })
    .max(100, { message: "100文字以内で入力してください" }),
  avatar: z
    .string()
    .optional()
    .nullable()
    .transform((val) => (val === "" ? null : val)),
  cover_image: z
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
  job_title: z
    .string()
    .max(100, { message: "100文字以内で入力してください" })
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
  birth_place: z
    .string()
    .max(100, { message: "100文字以内で入力してください" })
    .optional()
    .nullable()
    .transform((val) => (val === "" ? null : val)),
  sns_links: z.array(snsLinksSchema).optional().nullable(),
});

/** フォーム入力データ型 */
export type ProfileParams = z.infer<typeof profileSchema>;
