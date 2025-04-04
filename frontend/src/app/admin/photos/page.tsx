"use client";

import { PhotoSelectGrid } from "@/components/photo/editor/PhotoSelectGrid";
import { ActionButton } from "@/components/ui/ActionButton";
import { usePaginatedPhotos } from "@/hooks/photo/usePaginatedPhotos";

export default function AdminPhotoListPage() {
  const { photos, total, hasMore, isLoading, loadMore, reload } =
    usePaginatedPhotos();

  return (
    <>
      <h1 className="text-xl font-bold mb-4">画像一覧 ({total}件)</h1>
      <PhotoSelectGrid photos={photos} reload={reload} />

      {hasMore && (
        <div className="text-center mt-6">
          <ActionButton
            label="もっと見る"
            onClick={loadMore}
            isLoading={isLoading}
            color="blue"
          />
        </div>
      )}
    </>
  );
}
