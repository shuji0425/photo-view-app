import { z } from "zod";
import { toJSTMidnightISOString } from "../utils/date";

/**
 * タグのバリデーション
 */
const tagSchema = z
  .string()
  .trim()
  .min(1, "タグを入力してください")
  .refine((val) => !val.includes(" "), {
    message: "タグに空白は含められません",
  });

/**
 * 撮影日時のバリデーション（nullable対応）
 */
const nullableDateString = z
  .string()
  .nullable()
  .transform((val) => (val === "" ? null : val))
  .transform((val) => toJSTMidnightISOString(val));

/**
 * バリデーション
 */
export const photoUpdateSchema = z.object({
  photoId: z.number(),
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
  categoryId: z.number({ message: "数値が必要です" }).optional().nullable(),
  isVisible: z.boolean(),
  takenAt: nullableDateString,
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
