/** SNSリンク構造（DTO） */
export type SNSLinkDTO = {
  platform: "twitter" | "instagram" | "facebook" | "other";
  platform_name?: string;
  url: string;
};

/** プロフィールレスポンスDTO（APIからそのまま） */
export type UserProfileResponseDTO = {
  display_name: string;
  avatar?: string | null;
  cover_image?: string | null;
  bio?: string | null;
  job_title?: string | null;
  website?: string | null;
  location?: string | null;
  birth_place?: string | null;
  sns_links: SNSLinkDTO[];
  is_public: boolean;
};
