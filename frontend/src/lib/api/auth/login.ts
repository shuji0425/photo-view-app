import { LoginParams } from "@/types/auth";

/**
 * ログインAPI
 * @param params ログイン用のパラメータ
 * @throws エラーの時は例外処理
 */
export const login = async (params: LoginParams): Promise<string> => {
  console.log("into Login");
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(params),
  });

  console.log("login", res);
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "ログインに失敗しました");
  }

  const data = await res.json();
  return data.message;
};
