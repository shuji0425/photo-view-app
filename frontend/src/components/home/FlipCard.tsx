"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { PublicPhoto } from "@/types/public/photo";
import { cn } from "@/lib/utils/cn";
import { useFitMode } from "@/hooks/useFitMode";

type Props = {
  photo: PublicPhoto;
  isFirst: boolean;
};

/**
 * フリップカード
 */
export const FlipCard = ({ photo, isFirst }: Props) => {
  const [flipped, setFlipped] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { className: fitClassName } = useFitMode({
    photoAspectRatio: photo.aspectRatio,
    containerRef: containerRef,
  });

  // ダブルタップ判定
  let lastTap = 0;
  const handleDoubleTap = () => {
    const now = Date.now();
    if (now - lastTap < 300) {
      setFlipped((prev) => !prev);
    }
    lastTap = now;
  };

  return (
    <div
      className="w-full h-full perspective cursor-pointer p-1"
      onDoubleClick={() => setFlipped((prev) => !prev)}
      onTouchEnd={handleDoubleTap}
    >
      <motion.div
        className="relative w-full h-full transition-transform duration-700"
        animate={{ rotateY: flipped ? 180 : 0 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* 表面 */}
        <div
          className={cn(
            "absolute inset-0 backface-hidden",
            flipped && "hidden"
          )}
        >
          <div
            ref={containerRef}
            className="relative w-full h-full"
            style={{ aspectRatio: photo.aspectRatio }}
          >
            <Image
              src={photo.url}
              alt={photo.title ?? "photo"}
              fill
              priority={isFirst}
              loading={isFirst ? "eager" : "lazy"}
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-contain"
            />
          </div>
        </div>

        {/* 裏面 */}
        <div
          className={cn(
            "absolute inset-0 rotate-y-180 backface-hidden overflow-hidden",
            !flipped && "hidden"
          )}
        >
          <div
            className={cn(
              "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
              "text-black bg-gray-100 px-6 py-8 sm:px-10 sm:py-12",
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
                <p className="text-base sm:text-lg leading-relaxed whitespace-pre-wrap mb-4">
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
