"use client";

import React, { memo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PublicPhoto } from "@/types/public/photo";
import { cn } from "@/lib/utils/cn";
import { useFitMode } from "@/hooks/useFitMode";
import { motion } from "framer-motion";

type Props = {
  photo: PublicPhoto;
  isFirst: boolean;
};

/**
 * フリップカード
 */
const FlipCardComponent = ({ photo, isFirst }: Props) => {
  const [flipped, setFlipped] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lastTapRef = useRef<number>(0);
  const { className: fitClassName } = useFitMode({
    photoAspectRatio: photo.aspectRatio,
    containerRef: containerRef,
  });

  // ダブルタップ判定
  const handleClick = () => {
    const now = Date.now();
    if (now - lastTapRef.current < 300) {
      setFlipped((prev) => !prev);
    }
    lastTapRef.current = now;
  };

  return (
    <div
      className="w-full h-full perspective cursor-pointer p-1 overflow-hidden"
      onClick={handleClick}
    >
      <motion.div
        className="relative w-full h-full transition-transform duration-700"
        initial={false}
        animate={{ rotateY: flipped ? 180 : 0 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* 表面 */}
        <div
          ref={containerRef}
          className="relative w-full h-full backface-hidden flex items-center justify-center"
        >
          <Image
            src={photo.url}
            alt={photo.title ?? "photo"}
            width={photo.width}
            height={photo.height}
            priority={isFirst}
            loading={isFirst ? "eager" : "lazy"}
            fetchPriority={isFirst ? "high" : "auto"}
            decoding="async"
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain w-full h-full max-w-full max-h-full overflow-hidden"
            draggable={false}
          />
        </div>

        {/* 裏面 */}
        <div
          className={cn(
            "absolute inset-0 rotate-y-180 backface-hidden overflow-hidden"
          )}
        >
          <div
            className={cn(
              "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
              "text-black bg-gray-100",
              "px-6 py-8 sm:px-10 sm:py-12",
              "flex flex-col justify-center items-center text-center gap-4",
              "max-w-full max-h-full",
              fitClassName
            )}
            style={{ aspectRatio: photo.aspectRatio }}
          >
            <div>
              {photo.title && (
                <h2 className="text-xl sm:text-2xl font-bold mb-2">
                  {photo.title}
                </h2>
              )}
              {photo.takenAt && (
                <p className="text-sm sm:text-base text-gray-600 mb-3">
                  撮影日: {new Date(photo.takenAt).toLocaleDateString()}
                </p>
              )}
              {photo.description && (
                <p className="text-base sm:text-lg leading-relaxed whitespace-pre-wrap break-words mb-4">
                  {photo.description}
                </p>
              )}
            </div>
            <div className="text-right">
              <Link
                href={`/photo/${photo.id}`}
                className="inline-block px-5 py-2 bg-black text-white text-sm rounded-full hover:bg-gray-800 transition"
              >
                詳細ページへ
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const FlipCard = memo(FlipCardComponent, (prev, next) => {
  return prev.photo.id === next.photo.id && prev.isFirst === next.isFirst;
});
