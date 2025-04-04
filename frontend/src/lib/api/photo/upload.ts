import axios from "axios";
import camelcaseKeys from "camelcase-keys";

/**
 * 画像を送信
 * @param formData 画像データ
 * @returns 画像ID
 */
export const postUploadImages = async (
  userId: number,
  formData: FormData,
  onProgress?: (percent: number) => void
): Promise<number[] | null> => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/photos/upload/${userId}`,
    formData,
    {
      withCredentials: true,
      onUploadProgress: (event) => {
        if (onProgress && event.total) {
          const percent = Math.round((event.loaded * 100) / event.total);
          onProgress(percent);
        }
      },
    }
  );

  // 型変換
  const data = camelcaseKeys(res.data) as { photoIds: number[] };
  return data.photoIds;
};
