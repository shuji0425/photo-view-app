export const deletePhotosByIds = async (ids: number[]): Promise<void> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/photos/`, {
    method: "DELETE",
    credentials: "include",
    body: JSON.stringify({ ids }),
  });

  if (!res.ok) {
    throw new Error("画像の削除に失敗しました");
  }
};
