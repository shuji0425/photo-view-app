import { apiFetch } from "../client";

export const updateTagSortOrder = (
  payload: { id: number; sortOrder: number }[]
): Promise<void> => {
  return apiFetch<void>(`${process.env.NEXT_PUBLIC_API_URL}/admin/tags/sort`, {
    method: "PUT",
    body: payload,
  });
};
