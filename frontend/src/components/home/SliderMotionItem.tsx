"use client";

import { motion } from "framer-motion";
import { FlipCard } from "./FlipCard";
import { PublicPhoto } from "@/types/public/photo";

type Props = {
  photo: PublicPhoto;
  direction: "left" | "right";
  currentIndex: number;
};

const variants = {
  enter: (dir: "left" | "right") => ({
    x: dir === "left" ? 600 : -600,
    opacity: 1,
  }),
  center: { x: 0, opacity: 1 },
  exit: (dir: "left" | "right") => ({
    x: dir === "right" ? -600 : 600,
    opacity: 1,
  }),
};

/**
 * スライダーの部分
 */
export const SliderMotionItem = ({ photo, direction, currentIndex }: Props) => {
  const isFirst = currentIndex === 0;
  return (
    <motion.div
      key={photo.id}
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        x: { type: "tween", duration: 0.3 },
        opacity: { duration: 0.4 },
      }}
      className="absolute w-full h-full flex items-center justify-center"
    >
      <FlipCard photo={photo} isFirst={isFirst} />
    </motion.div>
  );
};
