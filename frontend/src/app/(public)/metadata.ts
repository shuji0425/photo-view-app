import { createGenericMetadata } from "@/lib/utils/seo";

/**
 * ホーム用のmetadata
 */
export const homeMetadata = () => {
  return createGenericMetadata({
    title: "ホーム",
    description:
      "趣味のカメラとプログラミングを掛け合わせたサイトです。タグでの絞り込みや、ダブルタップで詳細情報の表示などができます。楽しんでいってください。",
    pathname: "/",
  });
};
