/** SNSリンク構造 */
export type SNSLink = {
  platform: "twitter" | "instagram" | "facebook" | "other";
  platform_name?: string;
  url: string;
};

/** 管理者の公開プロフィール情報 */
export type Profile = {
  displayName: string;
  avatar?: string | null;
  coverImage?: string | null;
  bio?: string | null;
  jobTitle?: string | null;
  website?: string | null;
  location?: string | null;
  birthPlace?: string | null;
  snsLinks: SNSLink[];
  isPublic: boolean;
};
