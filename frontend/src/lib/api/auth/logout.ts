/**
 * ログアウトAPI
 * JWT Cookieを削除するための処理
 * @throws エラーは例外
 */
export const logout = async (): Promise<void> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
    method: "POST",
    credentials: "include", // JWT Cookieを送信 HttpOnly Cookie削除のために必要
  });

  // エラーの時は例外処理
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "ログアウトに失敗しました");
  }
};
