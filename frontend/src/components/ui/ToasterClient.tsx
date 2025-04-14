"use client";

import dynamic from "next/dynamic";

// クライアント側で Toaster を遅延読み込み（ssr 無効）
const Toaster = dynamic(
  () => import("react-hot-toast").then((mod) => mod.Toaster),
  {
    ssr: false,
  }
);

const ToasterClient = () => {
  return <Toaster position="top-center" />;
};

export default ToasterClient;
