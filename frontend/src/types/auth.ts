/** ログイン用パラメータ */
export type LoginParams = {
  email: string;
  password: string;
};

/** ログイン中のユーザー */
export type AuthUser = {
  id: string;
  email: string;
  username: string;
  role: "user" | "admin";
};
