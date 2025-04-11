import { PhotoEditPage } from "@/components/photo/editor/PhotoEditPage";
import { Suspense } from "react";

/**
 * 写真情報編集画面
 */
export default function EditPage() {
  return (
    <Suspense fallback={<div className="p-4">読み込み中...</div>}>
      <PhotoEditPage />
    </Suspense>
  );
}
