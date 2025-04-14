"use client";

import { HTMLMotionProps } from "framer-motion";
import dynamic from "next/dynamic";
import { useState, useEffect, CSSProperties } from "react";

// Motion.divの遅延読み込み
const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  { ssr: false }
);

type Props = {
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
} & HTMLMotionProps<"div">;

/**
 * 遅延読み込みでもスタイルを崩さず描画する motion.div
 */
export const SafeMotion = ({ children, className, style, ...rest }: Props) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setReady(true);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  if (!ready) {
    return (
      <div
        className={className}
        style={{ visibility: "hidden", height: "100%", ...style }}
      />
    );
  }

  return (
    <MotionDiv className={className} style={style} {...rest}>
      {children}
    </MotionDiv>
  );
};
