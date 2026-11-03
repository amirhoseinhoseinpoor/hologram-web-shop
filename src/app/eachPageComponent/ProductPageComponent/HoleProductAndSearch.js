"use client";

import React, { useState } from "react";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import style from "../../Styles/ProductPage/DynamicSearchAndItems.module.scss";
import ProductCard from "@/app/Components/product/ProductCard";
import cardStyle from "@/app/Components/product/ProductCard.module.scss";

const normalizeString = (str = "") =>
  str.replace(/\s+/g, " ").trim().toLowerCase();

export default function HoleProductAndSearch({
  products,
  categories,
  activeCategory,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const term = normalizeString(searchTerm);
  const filteredProducts = products.filter((product) =>
    [product.name, product.intro, product.details].some((text) =>
      normalizeString(text).includes(term),
    ),
  );

  return (
    <>
      <div className={style.toolbar}>
        {categories.length > 0 && (
          <nav className={style.categories} aria-label="دسته‌های محصول">
            {categories.map((category) => (
              <Link
                key={category.link}
                href={category.link}
                className={`az-chip ${
                  category.title === activeCategory ? "az-chip--active" : ""
                }`}
                aria-current={
                  category.title === activeCategory ? "page" : undefined
                }
              >
                {category.title}
              </Link>
            ))}
          </nav>
        )}
        {products.length > 0 && (
          <div className={style.search}>
            <SearchIcon aria-hidden="true" />
            <input
              type="search"
              className="az-input"
              aria-label="جست و جو در محصولات این دسته"
              placeholder="جست و جو در محصولات این دسته"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}
      </div>

      {products.length === 0 ? (
        <div className="az-state">
          <p>محصولی برای این دسته‌بندی یافت نشد.</p>
          <p className="discription">
            می‌توانید از دسته‌های بالا محصول دیگری را انتخاب کنید.
          </p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="az-state" role="status">
          <p>نتیجه‌ای برای «{searchTerm}» پیدا نشد.</p>
          <button
            type="button"
            className="az-btn az-btn--outline az-btn--sm"
            onClick={() => setSearchTerm("")}
          >
            پاک کردن جست و جو
          </button>
        </div>
      ) : (
        <div className={cardStyle.grid}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.code} product={product} />
          ))}
        </div>
      )}
    </>
  );
}
