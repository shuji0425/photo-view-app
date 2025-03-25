import { NextRequest, NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

/**
 * Next.jsのmiddlewareで管理画面ルートを保護
 * @param req リクエスト
 * @returns 遷移
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 静的ファイルやAPIルート、ログインページ自体は除外
  const isPublicPath =
    pathname === "/admin/login" ||
    pathname.startsWith("/api") ||
    PUBLIC_FILE.test(pathname);

  // CookieからJWTを取得
  const token = req.cookies.get("access_token")?.value;

  // admin配下かつ未承認ならリダイレクト
  if (pathname.startsWith("/admin") && !isPublicPath && !token) {
    const loginURL = new URL("/admin/login", req.url);
    return NextResponse.redirect(loginURL);
  }

  return NextResponse.next();
}

/**
 * middlewareを適用するルート
 */
export const config = {
  matcher: ["/admin/:path*"], // admin配下に適用
};
