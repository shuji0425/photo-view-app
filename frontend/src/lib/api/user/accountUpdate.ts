import { BasicAccountParams } from "@/lib/schema/accountSchema";
import { apiFetch } from "../client";
import { AuthUser } from "@/types/user";

/**
 * アカウント情報更新
 */
export const updateAccountInfo = async (
  params: BasicAccountParams
): Promise<AuthUser> => {
  return await apiFetch<AuthUser>(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/me/basic`,
    {
      method: "PATCH",
      body: params,
    }
  );
};
