"use client";

import { useState } from "react";
import CategoryTagList from "@/components/category/CategoryTagList";
import { mockPhotos } from "@/data/photo";
import PhotoViewer from "@/components/photo/PhotoViewer";
// import PhotoStackView from "@/components/photo/PhotoStackView";

const availableTags = [
  "Portrait",
  "Street",
  "Nature",
  "Architecture",
  "Portrait2",
  "Street2",
  "Nature2",
  "Architecture2",
];

export default function HomePage() {
  const [selectedTag, setSelectedTag] = useState("Portrait");
  const filteredPhotos = mockPhotos.filter((photo) =>
    photo.tags.includes(selectedTag)
  );

  return (
    <div className="h-screen w-screen max-w-full flex flex-col overflow-hidden bg-white">
      {/* カテゴリータグ */}
      <div className="shrink-0 w-full overflow-x-auto">
        <div className="flex gap-2 w-max">
          <CategoryTagList
            tags={availableTags}
            selectedTag={selectedTag}
            onTagSelect={setSelectedTag}
          />
        </div>
      </div>

      {/* メインビュー */}
      <div className="flex-1 min-h-0 overflow-hidden">
        {filteredPhotos.length > 0 ? (
          <PhotoViewer photos={filteredPhotos} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            該当する写真が見つかりませんでした。
          </div>
        )}
      </div>
    </div>
  );
}
