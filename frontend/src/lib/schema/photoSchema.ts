import { z } from "zod";

const tagSchema = z
  .string()
  .trim()
  .min(1, "タグを入力してください")
  .refine((val) => !val.includes(" "), {
    message: "タグに空白は含められません",
  });

/**
 * バリデーション
 */
export const photoUpdateSchema = z.object({
  photo_id: z.number(),
  title: z
    .string()
    .max(255)
    .optional()
    .nullable()
    .transform((val) => (val === "" ? null : val)),
  description: z
    .string()
    .optional()
    .nullable()
    .transform((val) => (val === "" ? null : val)),
  category_id: z.number().optional().nullable(),
  is_visible: z.boolean(),
  taken_at: z
    .string()
    .nullable()
    .optional()
    .transform((val) => (val === "" ? null : val))
    .refine(
      (val) =>
        val === null || (typeof val === "string" && !isNaN(Date.parse(val))),
      "無効な日付です"
    ),
  tags: z.array(tagSchema).optional().nullable(),
});

/** 一括更新用 */
export const photoBulkUpdateSchema = z.object({
  updates: z.array(photoUpdateSchema),
});

/** 単体更新型 */
export type PhotoUpdateParams = z.infer<typeof photoUpdateSchema>;

/** 一括更新型 */
export type PhotoBulkUpdateParams = z.infer<typeof photoBulkUpdateSchema>;
