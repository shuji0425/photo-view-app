/** ログイン用パラメータ */
export type LoginRequest = {
  email: string;
  password: string;
};

/** ログイン時の返却値 */
export type LoginResponse = {
  message: string;
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
