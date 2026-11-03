import React from "react";
import Link from "next/link";
import MainLayout from "../layouts/MainLayout";
import HoleProductAndSearch from "../eachPageComponent/ProductPageComponent/HoleProductAndSearch";
import PageIntro from "../Components/ui/PageIntro";
import { parseProductName, toProductView } from "../utils/productContent";
import {
  fetchHeaderItems,
  fetchProducts,
  getCategories,
} from "../utils/serverApi";

export const revalidate = 60; // ISR every 60 seconds

export async function generateMetadata({ params }) {
  const decodedId = decodeURIComponent(params.ProductPage);

  return {
    title: `${decodedId} | محصولات`,
    description: `خرید و سفارش ${decodedId} از آذرهولوگرام. مشاهده انواع محصولات هولوگرامی در دسته‌بندی ${decodedId}.`,
    alternates: {
      canonical: `/${encodeURIComponent(params.ProductPage)}`,
    },
    openGraph: {
      title: `${decodedId} | محصولات آذرهولوگرام`,
      description: `خرید و سفارش ${decodedId} از آذرهولوگرام.`,
    },
  };
}

// Function to recursively find an item by title in the header data
function findItemByTitle(items, title) {
  for (const item of items) {
    if (item.title === title) return item;
    if (item.subItems?.length > 0) {
      const found = findItemByTitle(item.subItems, title);
      if (found) return found;
    }
  }
  return null;
}

export default async function ProductPage({ params }) {
  const decodedId = decodeURIComponent(params.ProductPage);

  const [allProducts, headerItems] = await Promise.all([
    fetchProducts(),
    fetchHeaderItems(),
  ]);

  const matchedItem = findItemByTitle(headerItems, decodedId);
  const categories = getCategories(headerItems);

  if (!matchedItem) {
    return (
      <MainLayout>
        <PageIntro title={decodedId} />
        <section className="az-section container">
          <div className="az-state">
            <p>دسته‌بندی مورد نظر یافت نشد.</p>
            <Link href="/" className="az-btn az-btn--outline az-btn--sm">
              بازگشت به صفحه اصلی
            </Link>
          </div>
        </section>
      </MainLayout>
    );
  }

  const subItemTitles = (matchedItem.subItems || []).map((sub) => sub.title);

  const products = allProducts
    .filter((product) =>
      subItemTitles.includes(parseProductName(product.name).name),
    )
    .map(toProductView);

  return (
    <MainLayout>
      <PageIntro
        eyebrow="محصولات"
        title={matchedItem.title}
        description={
          products.length > 0
            ? `${products.length.toLocaleString("fa-IR")} محصول در این دسته`
            : undefined
        }
      />
      <section className="az-section container">
        <HoleProductAndSearch
          products={products}
          categories={categories}
          activeCategory={matchedItem.title}
        />
      </section>
    </MainLayout>
  );
}
