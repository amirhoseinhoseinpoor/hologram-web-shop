import {
  findProductByPath,
  toProductView,
} from "@/app/utils/productContent";
import { fetchProducts } from "@/app/utils/serverApi";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://azarhologram.net";

export async function generateMetadata({ params }) {
  const category = decodeURIComponent(params.ProductPage);
  const productName = decodeURIComponent(params.Product);

  const product = findProductByPath(
    await fetchProducts(),
    category,
    productName,
  );
  const view = product ? toProductView(product) : null;

  const title = view?.title || productName;
  const description =
    view?.intro ||
    view?.details?.slice(0, 160) ||
    `${title} - هولوگرام امنیتی از آذرهولوگرام`;
  const pageUrl = `${SITE_URL}/${encodeURIComponent(category)}/${encodeURIComponent(productName)}`;

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
      images: view?.cover ? [{ url: view.cover, alt: title }] : undefined,
    },
  };
}

export default function ProductLayout({ children }) {
  return children;
}
