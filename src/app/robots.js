export default function robots() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://azarhologram.co";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/Login", "/SignUp", "/ForgetPassword", "/Profile"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
