import { MetadataPolicySchema } from "@/lib/schema/metadataPolicySchema";
import { apiFetch } from "../client";

/**
 * 取得
 */
export const getMetadataPolicy = (): Promise<MetadataPolicySchema> => {
  return apiFetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/metadata-policy`);
};
