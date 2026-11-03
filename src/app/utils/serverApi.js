// Cached server-side reads of public content.

const API_URL = process.env.NEXT_PUBLIC_BACK_END_SERVER;

async function fetchPublic(path, fallback) {
  try {
    const response = await fetch(`${API_URL}${path}`, {
      next: { revalidate: 60 },
      headers: { Origin: `${API_URL}` },
    });
    if (!response.ok) return fallback;
    return await response.json();
  } catch {
    return fallback;
  }
}

export async function fetchProducts() {
  const data = await fetchPublic("/product/list", []);
  return Array.isArray(data) ? data : [];
}

export async function fetchHeaderItems() {
  const data = await fetchPublic("/header/find", null);
  return Array.isArray(data?.content) ? data.content : [];
}

export async function fetchBlogs() {
  const data = await fetchPublic("/blogs/list", []);
  return Array.isArray(data) ? data : [];
}

export async function fetchHonors() {
  const data = await fetchPublic("/honors/list", []);
  return Array.isArray(data) ? data : [];
}

export async function fetchExhibitions() {
  const data = await fetchPublic("/exhibition/list", []);
  return Array.isArray(data) ? data : [];
}

export const PRODUCTS_NAV_LINK = "#test2";

// Product categories as configured in the admin panel's navigation.
export const getCategories = (headerItems) =>
  headerItems.find((item) => item.link === PRODUCTS_NAV_LINK)?.subItems || [];

export async function fetchBanners() {
  const data = await fetchPublic("/banner/list", []);
  return Array.isArray(data) ? data : [];
}

export async function fetchHomeVideos() {
  const data = await fetchPublic("/video/list", []);
  return Array.isArray(data) ? data : [];
}
