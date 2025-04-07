import camelcaseKeys from "camelcase-keys";
import snakecaseKeys from "snakecase-keys";

type RequestOptions<TRequest = unknown> = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: TRequest;
  headers?: HeadersInit;
  next?: { revalidate: number };
};

/**
 * 共通APIクライアント(snake/camel変換)
 * @param url APIのURL
 * @param options リクエスト内容
 * @returns json or error
 */
export async function apiFetch<TResponse, TRequest = unknown>(
  url: string,
  options: RequestOptions<TRequest> = {}
): Promise<TResponse> {
  const { method = "GET", body, headers, next } = options;
  const fetchOptions: RequestInit & { next?: { revalidate: number } } = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    credentials: "include",
    ...(next ? { next } : {}),
  };

  if (body) {
    fetchOptions.body = JSON.stringify(snakecaseKeys(body, { deep: true }));
  }

  const res = await fetch(url, fetchOptions);

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "APIエラー");
  }

  const json = await res.json();
  return camelcaseKeys(json, { deep: true }) as TResponse;
}
