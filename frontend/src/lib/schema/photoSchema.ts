import { z } from "zod";

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
    .datetime({ message: "ISO形式の日時を入力してください" })
    .nullable()
    .optional()
    .transform((val) => {
      if (!val || val === "") return null;
      const date = new Date(val);
      return isNaN(date.getTime()) ? null : date;
    }),
  tags: z
    .array(z.string())
    .optional()
    .nullable()
    .transform((arr) => (arr ? arr.map((t) => t.trim()).filter(Boolean) : [])),
});

/** 一括更新用 */
export const photoBulkUpdateSchema = z.object({
  updates: z.array(photoUpdateSchema),
});

/** 単体更新型 */
export type PhotoUpdateParams = z.infer<typeof photoUpdateSchema>;

/** 一括更新型 */
export type PhotoBulkUpdateParams = z.infer<typeof photoBulkUpdateSchema>;
