/** 管理者のプロフィール情報 */
export type Profile = {
  userId: number;
  avatar?: string | null;
  bio?: string | null;
  website?: string | null;
  location?: string | null;
};

/** プロフィール作成・更新用パラメータ */
export type ProfileParams = {
  avatar?: string | null;
  bio?: string | null;
  website?: string | null;
  location?: string | null;
};
