import { useCallback, useEffect, useRef, useState } from "react";
import { PhotoDetail } from "@/types/photo";
import { fetchPhotos } from "../../lib/queries/photo/fetchPhotos";

export const usePaginatedPhotos = (initialPage = 1, limit = 15) => {
  const [photos, setPhotos] = useState<PhotoDetail[]>([]);
  const photosRef = useRef<PhotoDetail[]>([]);
  const [page, setPage] = useState(initialPage);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const fetch = useCallback(
    async (pageToLoad: number) => {
      setIsLoading(true);
      try {
        const existingIds = new Set(photosRef.current.map((p) => p.id));
        const { photos: newPhotos, total } = await fetchPhotos(
          pageToLoad,
          limit,
          existingIds
        );

        setPhotos((prev) => [...prev, ...newPhotos]);
        setTotal(total);
        setHasMore(pageToLoad * limit < total);
      } catch {
        setHasMore(false);
        setTotal(0);
      } finally {
        setIsLoading(false);
      }
    },
    [limit]
  );

  // さらに取得
  const loadMore = () => {
    const nextPage = page + 1;
    fetch(nextPage);
    setPage(nextPage);
  };

  // 初期
  useEffect(() => {
    fetch(initialPage);
  }, [fetch, initialPage]);

  // リロード
  const reload = () => {
    setPhotos([]);
    setPage(1);
    fetch(1);
  };

  return { photos, total, hasMore, isLoading, loadMore, reload };
};
