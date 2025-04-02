import camelcaseKeys from "camelcase-keys";
import snakecaseKeys from "snakecase-keys";

type RequestOptions<TRequest = unknown> = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: TRequest;
  headers?: HeadersInit;
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
  const { method = "GET", body, headers } = options;
  const fetchOptions: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    credentials: "include",
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
