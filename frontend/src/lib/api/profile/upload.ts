/**
 * プロフィール画像をアップロード
 * @param file WebP形式の画像ファイル
 * @returns アップロードされた画像のURL
 */
export const uploadProfileImage = async (
  userId: number,
  file: File
): Promise<{ url: string }> => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/profiles/avatar/${userId}`,
    {
      method: "POST",
      credentials: "include",
      body: formData,
    }
  );

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "画像のアップロードに失敗しました");
  }

  return res.json();
};
