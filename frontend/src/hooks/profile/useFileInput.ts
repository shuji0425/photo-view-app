import { useCallback, useRef } from "react";

export type UseFileInputResult = {
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleAvatarClick: () => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => string | null;
};

/**
 * ファイル選択とinput要素のrefを管理する
 * @returns ファイルのinputのref、クリック処理、選択後のURL生成
 */
export const useFileInput = (): UseFileInputResult => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleAvatarClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  // URL生成
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): string | null => {
      const file = e.target.files?.[0];
      if (!file) return null;
      return URL.createObjectURL(file);
    },
    []
  );

  return { fileInputRef, handleAvatarClick, handleFileChange };
};
