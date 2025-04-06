import { useEffect, useRef, useState } from "react";

type PreviewManagerResult =
  | { mode: "single"; previewUrl: string | null }
  | { mode: "multiple"; previewUrls: string[] };

type Input = Blob | File | (Blob | File)[] | null;

/**
 * Blob or FileからプレビューURLを生成
 * @param input blob or file
 * @returns URLを返却
 */
export const usePreviewManager = (input: Input): PreviewManagerResult => {
  const [urls, setUrls] = useState<string[]>([]);
  const prevUrlsRef = useRef<string[]>([]);

  useEffect(() => {
    // 古いURLを全て解放
    prevUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));

    // 入力がnullならリセット
    if (!input) {
      setUrls([]);
      prevUrlsRef.current = [];
      return;
    }

    // 配列に変換
    const inputs = Array.isArray(input) ? input : [input];

    // 各ファイルからURLを生成
    const objectUrls = inputs.map((item) => URL.createObjectURL(item));
    setUrls(objectUrls);
    prevUrlsRef.current = objectUrls;

    return () => {
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [input]);

  return Array.isArray(input)
    ? { mode: "multiple", previewUrls: urls }
    : { mode: "single", previewUrl: urls[0] ?? null };
};
