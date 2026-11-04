import {
  findProductByPath,
  toProductView,
} from "@/app/utils/productContent";
import { decodeFully, pageMeta, plainText } from "@/app/utils/seo";
import { fetchProducts } from "@/app/utils/serverApi";

export async function generateMetadata({ params }) {
  const category = decodeFully(params.ProductPage);
  const name = decodeFully(params.Product);

  const product = findProductByPath(await fetchProducts(), category, name);
  if (!product) {
    return { title: "صفحه پیدا نشد", robots: { index: false } };
  }

  const view = toProductView(product);
  return pageMeta({
    title: `تولید و چاپ ${view.title}`,
    description:
      plainText(`${view.intro} ${view.details}`) ||
      `${view.title} از دسته ${category}: تولید با طرح اختصاصی در آذرهولوگرام و ثبت استعلام قیمت آنلاین.`,
    path: view.href,
    image: view.cover,
    imageAlt: view.title,
  });
}

export default function ProductLayout({ children }) {
  return children;
}
