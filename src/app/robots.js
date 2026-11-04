import { SITE_URL } from "./utils/seo";

// Account pages stay crawlable on purpose: they carry noindex, which a crawler
// can only see if robots.txt lets it fetch them.
export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/api/system/download/"],
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
