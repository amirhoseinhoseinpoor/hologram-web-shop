const apiUrl = new URL(
  process.env.NEXT_PUBLIC_BACK_END_SERVER || "https://azarhologram.net/api",
);

// Files in public/ keep the same name when replaced, so they stay revalidatable.
const PUBLIC_IMAGE_FOLDERS = [
  "LOGO",
  "motif",
  "HomeImages",
  "AboutImages",
  "BlogImages",
  "HonorsImage",
  "ProductPageImages",
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: apiUrl.protocol.replace(":", ""),
        hostname: apiUrl.hostname,
        port: apiUrl.port,
        pathname: `${apiUrl.pathname.replace(/\/$/, "")}/system/download/**`,
      },
    ],
    // WebP only: AVIF costs far more CPU, and this runs on a single-core server.
    formats: ["image/webp"],
    deviceSizes: [640, 828, 1080, 1280, 1600],
    imageSizes: [96, 160, 256, 384],
    // Uploads get a new uuid when replaced, so optimized copies never go stale.
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.azarhologram.net" }],
        destination: "https://azarhologram.net/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
      ...PUBLIC_IMAGE_FOLDERS.map((folder) => ({
        source: `/${folder}/:path*`,
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, stale-while-revalidate=86400",
          },
        ],
      })),
    ];
  },
};

export default nextConfig;
