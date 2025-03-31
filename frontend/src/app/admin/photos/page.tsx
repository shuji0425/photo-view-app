"use client";

import { useEffect, useState } from "react";
import { PhotoDetail } from "@/types/photo";
import { PhotoSelectGrid } from "@/components/photo/PhotoSelectGrid";
import { getPaginatedPhotos } from "@/lib/api/photo/getPaginated";
import toast from "react-hot-toast";
import { ActionButton } from "@/components/ui/ActionButton";

export default function AdminPhotoListPage() {
  const [photos, setPhotos] = useState<PhotoDetail[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 5;
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // 情報取得
  const fetchPhotos = async (pageToLoad: number) => {
    try {
      setIsLoading(true);
      const res = await getPaginatedPhotos(pageToLoad, limit);
      setPhotos((prev) => {
        const existingIds = new Set(prev.map((p) => p.id));
        const newUniquePhotos = res.photos.filter(
          (p) => !existingIds.has(p.id)
        );
        return [...prev, ...newUniquePhotos];
      });
      setTotal(res.total);
      setHasMore(pageToLoad * limit < res.total);
    } catch {
      setTotal(0);
      toast.error("画像の取得に失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos(1);
  }, []);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    fetchPhotos(nextPage);
    setPage(nextPage);
  };

  return (
    <>
      <h1 className="text-xl font-bold mb-4">画像一覧 ({total}件)</h1>
      <PhotoSelectGrid photos={photos} setPhotos={setPhotos} />

      {hasMore && (
        <div className="text-center mt-6">
          <ActionButton
            label="もっと見る"
            onClick={handleLoadMore}
            isLoading={isLoading}
            color="blue"
          />
        </div>
      )}
    </>
  );
}
