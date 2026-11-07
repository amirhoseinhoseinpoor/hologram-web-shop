import { notFound, permanentRedirect } from "next/navigation";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MainLayout from "@/app/layouts/MainLayout";
import ShowRoute from "@/app/Components/ShowRoute";
import JsonLd from "@/app/Components/JsonLd";
import EditorialSections from "@/app/Components/content/EditorialSections";
import VideoShowcase from "@/app/Components/VideoShowcase";
import SectionHeading from "@/app/Components/ui/SectionHeading";
import ProductCard from "@/app/Components/product/ProductCard";
import ProductDetails from "@/app/Components/product/ProductDetails";
import cardStyle from "@/app/Components/product/ProductCard.module.scss";
import ProductShow from "@/app/eachPageComponent/ProductInnerPageComponents/ProductShow";
import style from "@/app/Styles/ProductPage/innerProductPage/DynamicProductShow.module.scss";
import {
  findProductByPath,
  normalizeProductLink,
  toProductView,
} from "@/app/utils/productContent";
import {
  breadcrumbLd,
  decodeFully,
  encodePath,
  isEncodedMoreThanOnce,
} from "@/app/utils/seo";
import {
  CATEGORY_SEO,
  GUIDES,
  PRODUCT_READ_MORE,
  PRODUCTS_HUB,
} from "@/app/utils/seoContent";
import { fetchProducts } from "@/app/utils/serverApi";

export const revalidate = 60;

const GUIDE_LINKS = GUIDES.map((guide) => ({
  href: encodePath("Guide", guide.slug),
  label: guide.heading,
}));

// Articles about this product first, then the buying guides and the category's reading list.
function readMore(code, category) {
  const links = [
    ...(PRODUCT_READ_MORE[code] || []),
    ...GUIDE_LINKS,
    ...(CATEGORY_SEO[category]?.readMore || []),
  ];
  return links
    .filter((link, index) => links.findIndex((other) => other.href === link.href) === index)
    .slice(0, 8);
}

export default async function Product({ params }) {
  const category = decodeFully(params.ProductPage);
  const name = decodeFully(params.Product);

  // /محصولات/هولوگرام reads like a path to the category itself.
  if (category === PRODUCTS_HUB && CATEGORY_SEO[name]) {
    permanentRedirect(encodePath(name));
  }

  const products = await fetchProducts();

  if (category === "product" && products.some((item) => item.name === name)) {
    permanentRedirect(normalizeProductLink(`/product/${name}`));
  }

  const raw = findProductByPath(products, category, name);

  if (!raw) {
    notFound();
  }

  const product = toProductView(raw);

  if (
    isEncodedMoreThanOnce(params.ProductPage) ||
    isEncodedMoreThanOnce(params.Product)
  ) {
    permanentRedirect(product.href);
  }

  const related = products
    .map(toProductView)
    .filter((item) => item.category === category && item.code !== product.code)
    .slice(0, 3);

  return (
    <MainLayout>
      <JsonLd
        data={breadcrumbLd([
          { name: category, path: encodePath(category) },
          { name: product.title, path: product.href },
        ])}
      />
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
              <span className="az-eyebrow">توضیحات تکمیلی</span>
              <h2 id="product-details" className="az-h2">
                درباره {product.title}
              </h2>
            </div>
            <ProductDetails
              text={product.details}
              className={style.detailsText}
            />
          </div>
        </section>
      )}

      {product.videos.length > 0 && (
        <section className="az-section">
          <div className="container">
            <SectionHeading eyebrow="ویدیو" title={`${product.title} در عمل`} />
            <VideoShowcase videos={product.videos} fallbackTitle={product.title} />
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
                  href={encodePath(category)}
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

      <section className="az-section">
        <div className="container">
          <EditorialSections links={readMore(product.code, category)} />
        </div>
      </section>
    </MainLayout>
  );
}
