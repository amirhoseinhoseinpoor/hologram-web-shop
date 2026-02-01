export default async function sitemap() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://azarhologram.co";
  const backendUrl = process.env.NEXT_PUBLIC_BACK_END_SERVER;

  // Static pages
  const staticPages = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/AboutUs`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/ContactUs`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/Blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/Exhibition`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/Honors`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/EffectType`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Fetch dynamic data for blog posts
  let blogPages = [];
  try {
    const blogsRes = await fetch(`${backendUrl}/blogs/list`, {
      next: { revalidate: 3600 },
      headers: { Origin: backendUrl },
    });
    if (blogsRes.ok) {
      const blogs = await blogsRes.json();
      if (Array.isArray(blogs)) {
        blogPages = blogs.map((blog) => ({
          url: `${siteUrl}/Blog/${encodeURIComponent(blog.content?.title || "")}`,
          lastModified: blog.date ? new Date(blog.date) : new Date(),
          changeFrequency: "weekly",
          priority: 0.7,
        }));
      }
    }
  } catch (error) {
    console.error("Sitemap: Failed to fetch blogs", error);
  }

  // Fetch dynamic data for exhibitions
  let exhibitionPages = [];
  try {
    const exhibitionRes = await fetch(`${backendUrl}/exhibition/list`, {
      next: { revalidate: 3600 },
      headers: { Origin: backendUrl },
    });
    if (exhibitionRes.ok) {
      const exhibitions = await exhibitionRes.json();
      if (Array.isArray(exhibitions)) {
        exhibitionPages = exhibitions.map((item) => ({
          url: `${siteUrl}/Exhibition/${encodeURIComponent(item.title || "")}`,
          lastModified: item.date ? new Date(item.date) : new Date(),
          changeFrequency: "monthly",
          priority: 0.6,
        }));
      }
    }
  } catch (error) {
    console.error("Sitemap: Failed to fetch exhibitions", error);
  }

  // Fetch dynamic data for honors
  let honorsPages = [];
  try {
    const honorsRes = await fetch(`${backendUrl}/honors/list`, {
      next: { revalidate: 3600 },
      headers: { Origin: backendUrl },
    });
    if (honorsRes.ok) {
      const honors = await honorsRes.json();
      if (Array.isArray(honors)) {
        honorsPages = honors.map((item) => ({
          url: `${siteUrl}/Honors/${encodeURIComponent(item.title || "")}`,
          lastModified: item.date ? new Date(item.date) : new Date(),
          changeFrequency: "monthly",
          priority: 0.6,
        }));
      }
    }
  } catch (error) {
    console.error("Sitemap: Failed to fetch honors", error);
  }

  return [...staticPages, ...blogPages, ...exhibitionPages, ...honorsPages];
}
