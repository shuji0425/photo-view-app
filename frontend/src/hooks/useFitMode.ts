"use client";

import React, { useEffect, useState } from "react";

const EPSILON = 0.001;

type Props = {
  photoAspectRatio: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
};

/**
 * 画像のアスペクト比に応じて、画像が縦にフィットすべきか横にフィットすべきかを判定し、
 * Tailwindクラス名（h-full w-auto または w-full h-auto）を返すフック。
 * @returns className - 表示に適したクラス名
 */
export const useFitMode = ({ photoAspectRatio, containerRef }: Props) => {
  const [className, setClassName] = useState("w-full h-auto");

  const updateFitMode = () => {
    const container = containerRef.current;
    if (!container) return;

    // 画面のアスペクト比を計算
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    const screenAspectRatio = width / height;

    if (photoAspectRatio < 1 - EPSILON) {
      // 縦長の画像
      setClassName("h-full w-auto");
    } else if (screenAspectRatio < 1 - EPSILON) {
      // 縦長画面で横画像 → 横にフィット
      setClassName("w-full h-auto");
    } else if (photoAspectRatio < screenAspectRatio - EPSILON) {
      // 画像のAR < 画面 → 縦にフィット
      setClassName("h-full w-auto");
    } else {
      // それ以外 → 横にフィット
      setClassName("w-full h-auto");
    }
  };

  useEffect(() => {
    // 初期化＋リサイズ時に実行
    updateFitMode();

    window.addEventListener("resize", updateFitMode);
    return () => {
      window.removeEventListener("resize", updateFitMode);
    };
  });

  return { className };
};
