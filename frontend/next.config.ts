import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const isAnalyze = process.env.ANALYZE === "true";

const nextConfig: NextConfig = {
  /* config options here */
  // 外部URLから画像を取得する場合は追加必須（minioも）
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakeimg.pl",
      },
    ],
  },
};

export default isAnalyze
  ? withBundleAnalyzer({ enabled: true })(nextConfig)
  : nextConfig;
