// Single place that turns a raw API product into what the site displays.
//
// Admin fields (see adminPanel AddProduct.js):
//   info.title              "شرح مختصر"       shown as the product heading
//   info.subtitle           "توضیحات"         single line, the product introduction
//   info.subtitleCompelete  "توضیحات تکمیلی"  textarea, the full description
//
// The admin form requires these, so products that were never written up hold
// filler such as "توضیحات". Filler must never reach customers as content.

const API_URL = process.env.NEXT_PUBLIC_BACK_END_SERVER;

const PLACEHOLDER_TEXT =
  /^(توضیحات( محصول| تکمیلی)?|شرح مختصر|عنوان( ویدیو)?( یک)?|ویدیو ?\d*|بخش ویدیو ها هست|متن|نام مشخصه.*|نام ایتم.*)$/;

const clean = (value) => (typeof value === "string" ? value.trim() : "");

const compact = (value) => clean(value).replace(/\s+/g, " ");

export const isMeaningfulText = (value) => {
  const text = compact(value);
  return Boolean(text) && !PLACEHOLDER_TEXT.test(text);
};

export const mediaUrl = (src) =>
  src ? `${API_URL}/system/download/${src}` : null;

// product.name = "محصولات - Category - Product"; the URL is /Category/Product
export function parseProductName(name) {
  const parts = clean(name)
    .split(" - ")
    .map((part) => part.trim());
  return {
    name: parts[parts.length - 1] || "",
    category: parts.length >= 3 ? parts[parts.length - 2] : "",
  };
}

export const productHref = (category, name) =>
  `/${encodeURIComponent(category)}/${encodeURIComponent(name)}`;

// Older records link to a product as /product/<full product name>.
export function normalizeProductLink(link = "") {
  const match = link.match(/^\/product\/(.+)$/);
  if (!match) return link;
  const { category, name } = parseProductName(match[1]);
  return productHref(category, name);
}

export function getProductDescriptions(info = {}) {
  const intro = isMeaningfulText(info.subtitle) ? clean(info.subtitle) : "";
  const details = isMeaningfulText(info.subtitleCompelete)
    ? clean(info.subtitleCompelete)
    : "";

  // Never print the same text twice.
  if (intro && details && compact(intro) === compact(details)) {
    return { intro, details: "" };
  }
  return { intro, details };
}

// "توضیحات تکمیلی" is a plain textarea. Two line prefixes give it structure:
// "### " starts a heading and "- " a list item. Other lines are paragraphs, so
// text written before this convention still renders as it did.
const HEADING_LINE = /^#{2,4}\s+(.+)$/;
const LIST_LINE = /^[-•]\s+(.+)$/;

export function parseDetails(text = "") {
  const blocks = [];
  let list = null;
  for (const raw of clean(text).split(/\r?\n/)) {
    const line = raw.trim();
    const item = line.match(LIST_LINE);
    if (item) {
      if (!list) blocks.push((list = { type: "list", items: [] }));
      list.items.push(item[1]);
      continue;
    }
    list = null;
    if (!line) continue;
    const heading = line.match(HEADING_LINE);
    blocks.push(
      heading
        ? { type: "heading", text: heading[1] }
        : { type: "paragraph", text: line },
    );
  }
  return blocks;
}

// The same text without the markers, for meta descriptions and card summaries.
export const detailsToPlainText = (text = "") =>
  parseDetails(text)
    .map((block) => (block.type === "list" ? block.items.join("، ") : block.text))
    .join(" ");

function getProductSpecs(info = {}) {
  return (Array.isArray(info.sections) ? info.sections : [])
    .map((section) => ({
      type: section?.type,
      name: clean(section?.sectionName),
      items: (Array.isArray(section?.items) ? section.items : []).filter(
        (item) => isMeaningfulText(item?.name),
      ),
    }))
    .filter((section) => isMeaningfulText(section.name) && section.items.length);
}

function getProductVideos(media) {
  return (Array.isArray(media) ? media : [])
    .filter((item) => clean(item?.src))
    .map((item) => ({
      src: mediaUrl(item.src),
      poster: mediaUrl(clean(item.poster)),
      title: isMeaningfulText(item.title) ? clean(item.title) : "",
      description: isMeaningfulText(item.description)
        ? clean(item.description)
        : "",
    }));
}

function getProductGallery(info = {}) {
  return (Array.isArray(info.imgData) ? info.imgData : [])
    .filter((item) => clean(item?.src))
    .map((item) => ({
      isVideo: item.type === "2",
      src: mediaUrl(item.src),
      poster: mediaUrl(clean(item.poster)),
    }));
}

export function toProductView(product) {
  const info = product?.info || {};
  const { name, category } = parseProductName(product?.name);
  const gallery = getProductGallery(info);
  const { intro, details } = getProductDescriptions(info);

  return {
    code: product?.code,
    rawName: product?.name,
    name,
    category,
    title: isMeaningfulText(info.title) ? clean(info.title) : name,
    href: productHref(category, name),
    intro,
    details,
    detailsText: detailsToPlainText(details),
    specs: getProductSpecs(info),
    gallery,
    videos: getProductVideos(product?.media),
    cover: gallery.find((item) => !item.isVideo)?.src || null,
  };
}

export const findProductByPath = (products, category, name) =>
  products.find((item) => {
    const parsed = parseProductName(item?.name);
    return parsed.category === category && parsed.name === name;
  });
