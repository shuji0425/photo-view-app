"use client";

import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import { PublicPhoto } from "@/types/public/photo";

type Props = {
  photos: PublicPhoto[];
  activeIndex: number;
  onThumbClick: (index: number) => void;
};

/**
 * サムネイルスライダー
 */
export const CustomThumbnail = ({
  photos,
  activeIndex,
  onThumbClick,
}: Props) => {
  return (
    <div className="py-2 px-3 overflow-x-auto whitespace-nowrap scrollbar-hide">
      <div className="flex gap-2 w-max overflow-hidden">
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            onClick={() => onThumbClick(index)}
            className={cn(
              "relative aspect-square overflow-hidden rounded cursor-pointer border-2 transition-all",
              "w-[60px] sm:w-[80px] md:w-[70px] lg:w-[85px] xl:w-[90px]",
              activeIndex === index ? "border-blue-500" : "border-transparent"
            )}
          >
            <Image
              src={photo.url}
              alt={photo.title ?? "thumbnail"}
              fill
              sizes="(max-width: 768px) 20vw, 100px"
              className="object-cover"
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "auto"}
              decoding="async"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
