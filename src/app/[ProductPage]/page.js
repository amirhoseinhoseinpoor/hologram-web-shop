import React from "react";
import { notFound, permanentRedirect } from "next/navigation";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MainLayout from "../layouts/MainLayout";
import HoleProductAndSearch from "../eachPageComponent/ProductPageComponent/HoleProductAndSearch";
import PageIntro from "../Components/ui/PageIntro";
import SectionHeading from "../Components/ui/SectionHeading";
import JsonLd from "../Components/JsonLd";
import EditorialSections from "../Components/content/EditorialSections";
import ProductCard from "../Components/product/ProductCard";
import cardStyle from "../Components/product/ProductCard.module.scss";
import { toProductView } from "../utils/productContent";
import {
  breadcrumbLd,
  decodeFully,
  encodePath,
  isEncodedMoreThanOnce,
  pageMeta,
} from "../utils/seo";
import {
  CATEGORY_SEO,
  fallbackCategorySeo,
  HUB_SEO,
  PRODUCTS_HUB,
} from "../utils/seoContent";
import {
  fetchHeaderItems,
  fetchProducts,
  getCategories,
} from "../utils/serverApi";

export const revalidate = 60; // ISR every 60 seconds

const seoForCategory = (title) =>
  CATEGORY_SEO[title] || fallbackCategorySeo(title);

export async function generateMetadata({ params }) {
  const segment = decodeFully(params.ProductPage);

  if (segment === PRODUCTS_HUB) {
    return pageMeta({
      title: HUB_SEO.title,
      description: HUB_SEO.description,
      path: encodePath(PRODUCTS_HUB),
    });
  }

  const categories = getCategories(await fetchHeaderItems());
  if (!categories.some((category) => category.title === segment)) {
    return { title: "صفحه پیدا نشد", robots: { index: false } };
  }

  const seo = seoForCategory(segment);
  return pageMeta({
    title: seo.title,
    description: seo.description,
    path: encodePath(segment),
  });
}

function ProductsHub({ categories, views }) {
  return (
    <MainLayout>
      <JsonLd data={breadcrumbLd([{ name: PRODUCTS_HUB, path: encodePath(PRODUCTS_HUB) }])} />
      <PageIntro
        eyebrow="محصولات"
        title={HUB_SEO.heading}
        description={HUB_SEO.lead}
      />
      {categories.map((category, index) => {
        const items = views.filter((view) => view.category === category.title);
        if (items.length === 0) return null;
        return (
          <section
            key={category.title}
            className={`az-section ${index % 2 ? "az-section--soft" : ""}`}
          >
            <div className="container">
              <SectionHeading
                title={category.title}
                action={
                  <Link
                    href={encodePath(category.title)}
                    className="az-btn az-btn--ghost"
                  >
                    همه محصولات {category.title}
                    <ArrowBackIcon aria-hidden="true" />
                  </Link>
                }
              />
              <div className={cardStyle.grid}>
                {items.map((item) => (
                  <ProductCard key={item.code} product={item} />
                ))}
              </div>
            </div>
          </section>
        );
      })}
      <section className="az-section container">
        <EditorialSections links={HUB_SEO.links} />
      </section>
    </MainLayout>
  );
}

export default async function ProductPage({ params }) {
  const segment = decodeFully(params.ProductPage);

  const [allProducts, headerItems] = await Promise.all([
    fetchProducts(),
    fetchHeaderItems(),
  ]);
  const views = allProducts.map(toProductView);
  const categories = getCategories(headerItems);

  const isHub = segment === PRODUCTS_HUB;
  const category = categories.find((item) => item.title === segment);

  if (!isHub && !category) {
    // The old sitemap listed products as /محصولات - Category - Product, and the
    // navigation can expose a product by its name alone.
    const moved = views.find(
      (view) => view.rawName?.trim() === segment || view.name === segment,
    );
    if (moved) permanentRedirect(moved.href);
    notFound();
  }

  if (isEncodedMoreThanOnce(params.ProductPage)) {
    permanentRedirect(encodePath(segment));
  }

  if (isHub) return <ProductsHub categories={categories} views={views} />;

  const seo = seoForCategory(category.title);
  const subItemTitles = (category.subItems || []).map((sub) => sub.title);
  const products = views.filter((view) => subItemTitles.includes(view.name));

  return (
    <MainLayout>
      <JsonLd
        data={breadcrumbLd([
          { name: category.title, path: encodePath(category.title) },
        ])}
      />
      <PageIntro
        eyebrow="محصولات"
        title={seo.heading}
        description={seo.lead}
      />
      <section className="az-section container">
        <SectionHeading title={`انواع ${category.title}`} />
        <HoleProductAndSearch
          products={products}
          categories={categories}
          activeCategory={category.title}
        />
      </section>
      {(seo.sections.length > 0 || seo.faq.length > 0) && (
        <section className="az-section az-section--soft">
          <div className="container">
            <EditorialSections
              sections={seo.sections}
              faq={seo.faq}
              links={[...seo.links, ...seo.readMore]}
            />
          </div>
        </section>
      )}
    </MainLayout>
  );
}
