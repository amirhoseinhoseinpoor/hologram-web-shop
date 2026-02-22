export const revalidate = 60; // ISR every 60 seconds

import React from "react";
import MainLayout from "../layouts/MainLayout";
import HoleProductAndSearch from "../eachPageComponent/ProductPageComponent/HoleProductAndSearch";
import ShowRoute from "../Components/ShowRoute";

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

// Function to fetch products and header data
async function fetchProduct() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_END_SERVER}/product/list`,
      {
        // Ensures fresh data every 60 seconds
        next: { revalidate: 60 },
        headers: {
          Origin: `${process.env.NEXT_PUBLIC_BACK_END_SERVER}`,
        },
      }
    );

    if (!response.ok) {
      console.log("Failed to fetch data");
      return [];
    }

    const allProductCome = await response.json();

    return Array.isArray(allProductCome) ? allProductCome : [];
  } catch (error) {
    console.error("Fetch failed:", error);
    return [];
  }
}

async function fetchHeader() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_END_SERVER}/header/find`,
      {
        // Ensures fresh data every 60 seconds
        next: { revalidate: 60 },
        headers: {
          Origin: `${process.env.NEXT_PUBLIC_BACK_END_SERVER}`,
        },
      }
    );

    if (!response.ok) {
      console.log("Failed to fetch data");
      return [];
    }

    const header = await response.json();
    return header?.content || [];
  } catch (error) {
    console.error("Fetch failed:", error);
    return [];
  }
}

// Function to recursively find an item by title in the header data
function findItemByTitle(items, title) {
  for (let item of items) {
    if (item.title === title) {
      return item;
    } else if (item.subItems && item.subItems.length > 0) {
      let found = findItemByTitle(item.subItems, title);
      if (found) return found;
    }
  }
  return null;
}

// Async component for fetching data and rendering
export default async function ProductPage({ params }) {
  const { ProductPage: id } = params;
  const decodedId = decodeURIComponent(id); // Decode the category ID

  const allProduct = await fetchProduct(); // Fetch all products
  const headerCome = await fetchHeader(); // Fetch header data

  // Find the matched category from the header based on the decodedId
  const matchedItem = findItemByTitle(headerCome, decodedId);

  if (!matchedItem) {
    return (
      <MainLayout>
        <section className="container">
          <ShowRoute />
          <div>دسته‌بندی مورد نظر یافت نشد.</div>
        </section>
      </MainLayout>
    );
  }

  // const dynamicPath = `محصولات / ${pathSegments.join(" / ")}`.trim();

  // Extract the titles of the sub-items under the matched category
  let subItemTitles = [];
  if (matchedItem.subItems) {
    subItemTitles = matchedItem.subItems.map((subItem) => subItem.title);
  }

  const filteredProducts = allProduct.filter((product) => {
    const productPathSegments = product.name.split(" - "); // Split the product name into segments
    const lastSegment = productPathSegments[productPathSegments.length - 1]; // Get the last segment
    return subItemTitles.includes(lastSegment); // Check if the last segment matches any subItemTitles
  });


  if (filteredProducts.length === 0) {
    return (
      <MainLayout>
        <section className="container">
          <ShowRoute />
          <div>محصولی برای این دسته‌بندی یافت نشد.</div>
        </section>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <section className="container">
        <ShowRoute />
        <HoleProductAndSearch
          itemsClick={filteredProducts}
          matchedTitle={matchedItem.title}
        />
      </section>
    </MainLayout>
  );
}
