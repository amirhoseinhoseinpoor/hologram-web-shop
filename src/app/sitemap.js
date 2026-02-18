const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://azarhologram.ir";
const BACKEND = process.env.NEXT_PUBLIC_BACK_END_SERVER;

async function fetchBlogs() {
  try {
    const res = await fetch(`${BACKEND}/blogs/list`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

async function fetchHonors() {
  try {
    const res = await fetch(`${BACKEND}/honors/list`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

async function fetchExhibitions() {
  try {
    const res = await fetch(`${BACKEND}/exhibition/list`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

async function fetchProducts() {
  try {
    const res = await fetch(`${BACKEND}/product/list`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export default async function sitemap() {
  const [blogs, honors, exhibitions, products] = await Promise.all([
    fetchBlogs(),
    fetchHonors(),
    fetchExhibitions(),
    fetchProducts(),
  ]);

  // Static pages
  const staticPages = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/AboutUs`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/Blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/Honors`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/Exhibition`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/EffectType`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/ContactUs`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];

  // Blog pages
  const blogPages = blogs
    .filter((blog) => blog.content?.title)
    .map((blog) => ({
      url: `${SITE_URL}/Blog/${encodeURIComponent(blog.content.title)}`,
      lastModified: new Date(blog.date || Date.now()),
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  // Honors pages
  const honorsPages = honors
    .filter((honor) => honor.title)
    .map((honor) => ({
      url: `${SITE_URL}/Honors/${encodeURIComponent(honor.title)}`,
      lastModified: new Date(honor.date || Date.now()),
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  // Exhibition pages
  const exhibitionPages = exhibitions
    .filter((ex) => ex.title)
    .map((ex) => ({
      url: `${SITE_URL}/Exhibition/${encodeURIComponent(ex.title)}`,
      lastModified: new Date(ex.date || Date.now()),
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  // Product pages — name format: "محصولات / CategoryName / ProductName"
  const productPages = products
    .filter((p) => p.name)
    .map((p) => {
      const segments = p.name
        .replace(/^محصولات\s*\/\s*/, "")
        .split(/\s*\/\s*/)
        .map((s) => encodeURIComponent(s.trim()));
      return {
        url: `${SITE_URL}/${segments.join("/")}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.85,
      };
    });

  return [...staticPages, ...blogPages, ...honorsPages, ...exhibitionPages, ...productPages];
}
