import { HomePage } from "@/components/home/HomePage";
import { Suspense } from "react";

/**
 * メインページ
 */
export default function Home() {
  return (
    <Suspense fallback={<div className="p-4">読み込み中...</div>}>
      <HomePage />
    </Suspense>
  );
}
