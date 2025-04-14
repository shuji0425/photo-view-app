import {
  SITE_NAME,
  SITE_URL,
  DEFAULT_OGP_IMAGE,
} from "@/lib/constants/metadata";
import { Metadata } from "next";

type Props = {
  title: string;
  description?: string;
  imageUrl?: string;
  pathname?: string;
  type?: "website" | "profile" | "article";
};

/**
 * 一般的なページ用メタデータ作成
 */
export const createGenericMetadata = ({
  title,
  description,
  imageUrl,
  pathname = "/",
  type = "website",
}: Props): Metadata => {
  // 共通部分の定義
  const fullTitle = `${title} | ${SITE_NAME}`;
  const metaDescription = description ?? SITE_NAME;
  const ogImage = imageUrl ?? DEFAULT_OGP_IMAGE;

  return {
    title: fullTitle,
    description: metaDescription,
    openGraph: {
      title: fullTitle,
      description: metaDescription,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      url: `${SITE_URL}${pathname}`,
      siteName: SITE_NAME,
      locale: "ja_JP",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: metaDescription,
      images: [ogImage],
    },
    metadataBase: new URL(SITE_URL),
  };
};

/**
 * 管理画面に適用する noindex 設定
 */
export const createNoIndexMetadata = (title = "管理画面"): Metadata => {
  return {
    title: `${title} | ${SITE_NAME}`,
    robots: {
      index: false,
      follow: false,
    },
  };
};
