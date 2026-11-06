// Canonical site address plus helpers for page metadata and structured data.
import { COMPANY } from "./company";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://azarhologram.net"
).replace(/\/+$/, "");

export const absoluteUrl = (path = "/") => new URL(path, SITE_URL).href;

export const encodePath = (...segments) =>
  `/${segments.map(encodeURIComponent).join("/")}`;

// Old canonicals encoded paths again on every hop, so crawlers still request
// URLs such as /%2525D9...; unwrap until nothing changes.
export function decodeFully(value) {
  let current = value;
  for (let i = 0; i < 12; i++) {
    let next;
    try {
      next = decodeURIComponent(current);
    } catch {
      return current;
    }
    if (next === current) return current;
    current = next;
  }
  return current;
}

export const isEncodedMoreThanOnce = (value) => {
  try {
    return decodeURIComponent(value) !== decodeFully(value);
  } catch {
    return false;
  }
};

// Plain text from admin HTML, cut on a word boundary, for meta descriptions.
export function plainText(html = "", maxLength = 160) {
  const text = String(html)
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;|&zwnj;/g, " ")
    .replace(/&[a-z#0-9]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= maxLength) return text;
  const cut = text.slice(0, maxLength);
  return `${cut.slice(0, cut.lastIndexOf(" ")).trim()}…`;
}

const DEFAULT_IMAGE = { url: COMPANY.icon, width: 512, height: 512, alt: COMPANY.name };

const NAMES_THE_BRAND = /آذر\s?هولوگرام/;

// `path` must already be encoded (see encodePath).
export function pageMeta({
  title,
  description,
  path,
  image,
  imageAlt,
  type = "website",
  publishedTime,
}) {
  const fullTitle = NAMES_THE_BRAND.test(title)
    ? title
    : `${title} | ${COMPANY.name}`;

  return {
    // Skips the "| brand" template when the title already names the brand.
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: "fa_IR",
      siteName: COMPANY.name,
      url: path,
      title: fullTitle,
      description,
      images: image ? [{ url: image, alt: imageAlt || title }] : [DEFAULT_IMAGE],
      ...(publishedTime ? { publishedTime } : {}),
    },
  };
}

export const noIndexMeta = (title) => ({
  title,
  robots: { index: false, follow: true },
});

const HOME_CRUMB = { name: "خانه", path: "/" };

// items: [{ name, path }] from the first level down; the home page is added here.
export const breadcrumbLd = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [HOME_CRUMB, ...items].map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});

export const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: COMPANY.name,
  legalName: COMPANY.legalName,
  alternateName: ["خانه چاپ چکاوک", "Azar Hologram"],
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}${COMPANY.icon}`,
  description: COMPANY.intro,
  email: COMPANY.email,
  telephone: COMPANY.phoneE164,
  address: {
    "@type": "PostalAddress",
    streetAddress: COMPANY.street,
    addressLocality: COMPANY.city,
    addressCountry: "IR",
  },
  award: [
    "Excellence in Holography 2016 (IHMA), Commended: Best Applied Decorative/Packaging Product",
    "برگزیده بخش خلاقیت و نوآوری شانزدهمین جشنواره صنعت چاپ",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: COMPANY.phoneE164,
    contactType: "customer service",
    availableLanguage: "fa",
  },
};

export const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: COMPANY.name,
  alternateName: "Azar Hologram",
  url: `${SITE_URL}/`,
  inLanguage: "fa-IR",
  publisher: { "@id": `${SITE_URL}/#organization` },
};
