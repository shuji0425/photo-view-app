/** ログイン用パラメータ */
export type LoginParams = {
  email: string;
  password: string;
};

/** ログイン中のユーザー */
export type AuthUser = {
  id: number;
  email: string;
  username: string;
  role: "user" | "admin";
  createdAt: string; // ISO文字列
  updatedAt: string;
};
