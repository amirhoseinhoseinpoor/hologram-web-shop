import { absoluteUrl, encodePath } from "./utils/seo";
import { GUIDES, PRODUCTS_HUB } from "./utils/seoContent";
import { toProductView } from "./utils/productContent";
import {
  fetchBlogs,
  fetchExhibitions,
  fetchHeaderItems,
  fetchHonors,
  fetchProducts,
  getCategories,
} from "./utils/serverApi";

const STATIC_PATHS = [
  "/",
  encodePath(PRODUCTS_HUB),
  "/EffectType",
  "/Guide",
  "/Blog",
  "/Honors",
  "/Exhibition",
  "/AboutUs",
  "/ContactUs",
];

const entry = (path, date) => ({
  url: absoluteUrl(path),
  // Only content that records its own date gets one; a made-up date would teach
  // crawlers to ignore the field.
  ...(date ? { lastModified: new Date(date) } : {}),
});

export default async function sitemap() {
  const [products, headerItems, blogs, honors, exhibitions] = await Promise.all([
    fetchProducts(),
    fetchHeaderItems(),
    fetchBlogs(),
    fetchHonors(),
    fetchExhibitions(),
  ]);

  return [
    ...STATIC_PATHS.map((path) => entry(path)),
    ...getCategories(headerItems).map((category) =>
      entry(encodePath(category.title)),
    ),
    ...products.map(toProductView).map((view) => entry(view.href)),
    ...GUIDES.map((guide) => entry(encodePath("Guide", guide.slug))),
    ...blogs
      .filter((blog) => blog.content?.title)
      .map((blog) => entry(encodePath("Blog", blog.content.title), blog.date)),
    ...honors.map((item) => entry(encodePath("Honors", item.title), item.date)),
    ...exhibitions.map((item) =>
      entry(encodePath("Exhibition", item.title), item.date),
    ),
  ];
}
