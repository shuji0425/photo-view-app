import { z } from "zod";

/**
 * メタデータ表示ポリシー
 */
export const metadataPolicySchema = z.object({
  showCameraMake: z.boolean(),
  showCameraModel: z.boolean(),
  showLensModel: z.boolean(),
  showIso: z.boolean(),
  showFNumber: z.boolean(),
  showExposureTime: z.boolean(),
  showFocalLength: z.boolean(),
  showWhiteBalance: z.boolean(),
  showOrientation: z.boolean(),
  showTakenAt: z.boolean(),
  showGps: z.boolean(),
});

/**
 * 型定義
 */
export type MetadataPolicySchema = z.infer<typeof metadataPolicySchema>;
