import { SITE_URL } from "@/lib/constants/metadata";
import { getPublicPhotoPaths } from "@/lib/api/photo/getPublicPhotoPaths";

const joinUrl = (base: string, path: string) => {
  return `${base.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
};

/**
 * XML作成
 */
export async function GET() {
  const staticPages = ["", "profile", "privacy", "terms"];

  const photoPaths = await getPublicPhotoPaths();

  const urls = [...staticPages, ...photoPaths].map((path) => {
    const loc = joinUrl(SITE_URL, path);
    return `
      <url>
        <loc>${loc}</loc>
        <changefreq>weekly</changefreq>
        <priority>${path === "" ? "1.0" : "0.7"}</priority>
      </url>
    `.trim();
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls.join("\n")}
  </urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
