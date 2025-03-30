/**
 * 画像を送信
 * @param formData 画像データ
 * @returns 画像ID
 */
export const postUploadImages = async (
  userId: number,
  formData: FormData
): Promise<number[] | null> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/photos/upload/${userId}`,
    {
      method: "POST",
      body: formData,
      credentials: "include",
    }
  );

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "画像のアップロードに失敗");
  }

  const data = await res.json();

  return data.photoIds;
};
