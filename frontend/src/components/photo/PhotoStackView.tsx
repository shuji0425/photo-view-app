"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import type { Photo } from "@/types/photo";
import { useSwipeable } from "react-swipeable";

type Props = {
  photos: Photo[];
};

export default function PhotoStackView({ photos }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasSwiped, setHasSwiped] = useState(false);

  const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
  const nextIndex = (currentIndex + 1) % photos.length;

  const handleSwipe = useSwipeable({
    onSwipedLeft: () => {
      setCurrentIndex(nextIndex);
      setHasSwiped(true);
    },
    onSwipedRight: () => {
      setCurrentIndex(prevIndex);
      setHasSwiped(true);
    },
    trackTouch: true,
    touchEventOptions: { passive: false },
  });

  const positions = [
    {
      index: prevIndex,
      scale: 0.85,
      x: "-40%",
      z: 5,
      opacity: hasSwiped ? 0.6 : 0,
    },
    { index: currentIndex, scale: 1, x: "0%", z: 10, opacity: 1 },
    {
      index: nextIndex,
      scale: 0.85,
      x: "40%",
      z: 5,
      opacity: hasSwiped ? 0.6 : 0,
    },
  ];

  return (
    <div
      {...handleSwipe}
      className="relative w-full aspect-[2/3] overflow-visible flex items-center justify-center"
      style={{ touchAction: "pan-y" }}
    >
      {positions.map(({ index, scale, x, z, opacity }) => (
        <motion.div
          key={photos[index].id}
          initial={{ scale, x, opacity, zIndex: z }}
          animate={{ scale, x, opacity, zIndex: z }}
          transition={{ type: "spring", stiffness: 250, damping: 20 }}
          className="absolute w-4/5 aspect-[2/3] rounded-xl overflow-hidden shadow-lg bg-white"
        >
          <Image
            src={photos[index].url}
            alt={photos[index].title ?? ""}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 80vw, 400px"
            priority={index === currentIndex}
          />
        </motion.div>
      ))}
    </div>
  );
}
