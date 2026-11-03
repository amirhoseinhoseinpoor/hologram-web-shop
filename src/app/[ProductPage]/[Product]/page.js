import { notFound } from "next/navigation";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MainLayout from "@/app/layouts/MainLayout";
import ShowRoute from "@/app/Components/ShowRoute";
import FAQ from "@/app/Components/FAQ";
import VideoShowcase from "@/app/Components/VideoShowcase";
import SectionHeading from "@/app/Components/ui/SectionHeading";
import ProductCard from "@/app/Components/product/ProductCard";
import cardStyle from "@/app/Components/product/ProductCard.module.scss";
import ProductShow from "@/app/eachPageComponent/ProductInnerPageComponents/ProductShow";
import style from "@/app/Styles/ProductPage/innerProductPage/DynamicProductShow.module.scss";
import {
  findProductByPath,
  toProductView,
} from "@/app/utils/productContent";
import { fetchProducts } from "@/app/utils/serverApi";

export const revalidate = 60;

export default async function Product({ params }) {
  const category = decodeURIComponent(params.ProductPage);
  const name = decodeURIComponent(params.Product);

  const products = await fetchProducts();
  const raw = findProductByPath(products, category, name);

  if (!raw) {
    notFound();
  }

  const product = toProductView(raw);
  const related = products
    .map(toProductView)
    .filter((item) => item.category === category && item.code !== product.code)
    .slice(0, 3);

  return (
    <MainLayout>
      <div className={`container ${style.breadcrumbBar}`}>
        <ShowRoute />
      </div>

      <ProductShow product={product} />

      {product.details && (
        <section
          className={style.detailsSection}
          aria-labelledby="product-details"
        >
          <div className={`container ${style.detailsGrid}`}>
            <div>
              <span className="az-eyebrow">{product.name}</span>
              <h2 id="product-details" className="az-h2">
                توضیحات تکمیلی
              </h2>
            </div>
            <p className={`az-prose-text ${style.detailsText}`}>
              {product.details}
            </p>
          </div>
        </section>
      )}

      {product.videos.length > 0 && (
        <section className="az-section">
          <div className="container">
            <SectionHeading eyebrow="ویدیو" title={`${product.name} در عمل`} />
            <VideoShowcase videos={product.videos} fallbackTitle={product.name} />
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="az-section az-section--soft">
          <div className="container">
            <SectionHeading
              eyebrow={category}
              title="محصولات مرتبط"
              action={
                <Link
                  href={`/${encodeURIComponent(category)}`}
                  className="az-btn az-btn--ghost"
                >
                  همه محصولات {category}
                  <ArrowBackIcon aria-hidden="true" />
                </Link>
              }
            />
            <div className={cardStyle.grid}>
              {related.map((item) => (
                <ProductCard key={item.code} product={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      <FAQ />
    </MainLayout>
  );
}
