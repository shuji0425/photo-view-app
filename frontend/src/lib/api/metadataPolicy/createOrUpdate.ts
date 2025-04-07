import { MetadataPolicySchema } from "@/lib/schema/metadataPolicySchema";
import { apiFetch } from "../client";

/**
 * 表示ポリシー作成or更新
 */
export const createOrUpdateMetadataPolicy = (
  payload: MetadataPolicySchema
): Promise<void> => {
  return apiFetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/metadata-policy`, {
    method: "PATCH",
    body: payload,
  });
};
