import { apiFetch } from "../client";
import { PasswordUpdateSchema } from "@/lib/schema/accountSchema";

/**
 * パスワード更新
 */
export const updatePassword = async (
  params: PasswordUpdateSchema
): Promise<void> => {
  return await apiFetch<void>(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/me/password`,
    {
      method: "PATCH",
      body: params,
    }
  );
};
