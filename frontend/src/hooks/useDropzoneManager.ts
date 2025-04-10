import { useCallback } from "react";

type Props = {
  files: File[];
  setFiles: (files: File[]) => void;
};

/**
 * ドロップゾーンの共通化
 */
export const useDropzoneManager = ({ files, setFiles }: Props) => {
  // ファイル削除
  const handleRemove = useCallback(
    (index: number) => {
      const newFiles = [...files];
      newFiles.splice(index, 1);
      setFiles(newFiles);
    },
    [files, setFiles]
  );

  return { handleRemove };
};
