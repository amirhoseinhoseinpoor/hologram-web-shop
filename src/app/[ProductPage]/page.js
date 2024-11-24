import React from "react";

import MainLayout from "../layouts/MainLayout";
import HoleProductAndSearch from "../eachPageComponent/ProductPageComponent/HoleProductAndSearch";

import ShowRoute from "../Components/ShowRoute";
// import { notFound } from "next/navigation";
// import Link from "next/link";
// import style from "../Styles/ProductPage/DynamicProductPage.module.scss";
// import { get, param } from "jquery";

// function getProductDetailsById(id) {
//   const filePath = path.join(process.cwd(), "public", "json", "Header.json");
//   const jsonData = fs.readFileSync(filePath, "utf8");
//   const products = JSON.parse(jsonData);

//   const decodedId = decodeURIComponent(id);
//   const slashDecodedId = "/" + decodedId;

//   let matchedTitle = null;
//   const links = [];
//   const titles = [];
//   const itemsClick = [];

//   function extractLinksAndTitles(items) {
//     items.forEach((item) => {
//       if (item.subItems && item.subItems.length > 0) {
//         item.subItems.forEach((subItem) => {
//           if (subItem.link) {
//             links.push(subItem.link);
//           }
//           if (subItem.title) {
//             titles.push(subItem.title);
//           }
//           if (subItem.link === slashDecodedId) {
//             matchedTitle = subItem.title;
//           }
//           if (subItem.link === slashDecodedId && subItem.subItems.length > 0) {
//             subItem.subItems.forEach((innnerSub) => {
//               itemsClick.push(innnerSub);
//             });
//           }
//         });
//       }
//     });
//   }

//   extractLinksAndTitles(products);
//   return { links, titles, matchedTitle, itemsClick };
// }

// function fixTitleSize(text) {
//   var shortTitle;
//   if (text.length > 60) {
//     shortTitle = text.slice(0, 60) + "...";
//     return shortTitle;
//   } else {
//     return text;
//   }
// }


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

async function fetchProduct() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_END_SERVER}/product/list`
    );

    if (!response.ok) {
      console.log("Failed to fetch data");
      return [];
    }

    const allProductCome = await response.json();
    
    return Array.isArray(allProductCome) ? allProductCome : [];
  } catch (error) {
    console.error("Fetch failed:", error);
    return []; // Return fallback data if fetch fails
  }
}


async function fetchHeader() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_END_SERVER}/header/find`
    );

    if (!response.ok) {
      console.log("Failed to fetch data");
      return [];
    }

    const header = await response.json();
    return header?.content;
  } catch (error) {
    console.error("Fetch failed:", error);
    return []; // Return fallback data if fetch fails
  }
}

export default async function ProductPage({ params }) {
  const { ProductPage: id } = params;

  const decodedId = decodeURIComponent(id);

  const allProduct = await fetchProduct();
  
  const headerCome = await fetchHeader();

  // Find the matched category in the header based on the decodedId
  const matchedItem = findItemByTitle(headerCome, decodedId);

  if (!matchedItem) {
    // Handle the case where the item is not found
    console.log("Category not found");
    // You can return a 404 page or a message
    return (
      <MainLayout>
        <section className="container">
          <ShowRoute />
          <div>دسته‌بندی مورد نظر یافت نشد.</div>
        </section>
      </MainLayout>
    );
  }
  


  // Extract the titles of the sub-items under the matched category
  let subItemTitles = [];
  if (matchedItem && matchedItem.subItems) {
    subItemTitles = matchedItem.subItems.map((subItem) => subItem.title);
  }

  // Filter the products to include only those whose names match the sub-item titles
  const filteredProducts = allProduct.filter((product) =>
    subItemTitles.includes(product.name)
  );

  return (
    <>
      <MainLayout>
        <section className="container">
          <ShowRoute />
          <HoleProductAndSearch
           itemsClick={filteredProducts}
           matchedTitle={matchedItem.title}
          />
        </section>
      </MainLayout>
    </>
  );
}
