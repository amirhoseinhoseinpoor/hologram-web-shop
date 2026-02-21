const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://azarhologram.ir";
const BACKEND = process.env.NEXT_PUBLIC_BACK_END_SERVER;

async function fetchProducts() {
  try {
    const res = await fetch(`${BACKEND}/product/list`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }) {
  const productPageDecoded = decodeURIComponent(params.ProductPage);
  const productDecoded = decodeURIComponent(params.Product);

  const allProducts = await fetchProducts();
  const dynamicPath = `محصولات / ${productPageDecoded} / ${productDecoded}`;
  const productData = allProducts.find(
    (item) => item.name?.trim() === dynamicPath.trim()
  );

  const title = productData?.info?.title || productDecoded;
  const description =
    productData?.info?.description ||
    `${title} - هولوگرام امنیتی از آذرهولوگرام`;
  const pageUrl = `${SITE_URL}/${encodeURIComponent(productPageDecoded)}/${encodeURIComponent(productDecoded)}`;

  return {
    title,
    description,
    alternates: { canonical: pageUrl },
    openGraph: {
      type: "website",
      url: pageUrl,
      title,
      description,
      locale: "fa_IR",
    },
  };
}

export default function ProductLayout({ children }) {
  return children;
}
