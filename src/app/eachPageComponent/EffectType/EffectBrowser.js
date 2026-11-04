"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import style from "../../Styles/EffectType/EffectType.module.scss";
import VideoShowcase from "../../Components/VideoShowcase";
import ZoomModal from "../../BaseComponent/ZoomModal";

const normalizeString = (str = "") => str.replace(/\s+/g, "").toLowerCase();

// Samples of produced work by category; the first paint comes from the server.
export default function EffectBrowser({ categories, products, initialType }) {
  const [type, setType] = useState(initialType);
  const [searchTerm, setSearchTerm] = useState("");
  const [zoomSrc, setZoomSrc] = useState(null);

  const activeCategory =
    categories.find((category) => category.title === type) || categories[0];

  const views = useMemo(() => {
    if (!activeCategory) return [];
    const term = normalizeString(searchTerm);
    return products
      .filter((view) => activeCategory.names.includes(view.name))
      .filter((view) => normalizeString(view.title).includes(term));
  }, [activeCategory, products, searchTerm]);

  const images = views.flatMap((view) =>
    view.gallery
      .filter((media) => !media.isVideo)
      .map((media) => ({ ...media, name: view.title, href: view.href })),
  );
  const videos = views.flatMap((view) =>
    view.videos.map((video) => ({
      ...video,
      title: video.title || view.title,
    })),
  );

  const selectCategory = (title) => {
    setType(title);
    // Keeps the selection in a shareable address without another server render.
    window.history.replaceState(
      null,
      "",
      `/EffectType?type=${encodeURIComponent(title)}`,
    );
  };

  return (
    <section className="az-section container">
      <h2 className={`az-h2 ${style.heading}`}>نمونه افکت‌ها در محصولات</h2>
      <div className={style.toolbar}>
        <div
          className={style.chips}
          role="group"
          aria-label="دسته‌های محصول"
        >
          {categories.map((category) => (
            <button
              key={category.title}
              type="button"
              className={`az-chip ${
                category.title === activeCategory?.title ? "az-chip--active" : ""
              }`}
              aria-pressed={category.title === activeCategory?.title}
              onClick={() => selectCategory(category.title)}
            >
              {category.title}
            </button>
          ))}
        </div>
        <div className={style.search}>
          <SearchIcon aria-hidden="true" />
          <input
            type="search"
            className="az-input"
            aria-label="جست و جو بر اساس نام محصول"
            placeholder="جست و جو بر اساس نام محصول"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {images.length === 0 && videos.length === 0 && (
        <div className="az-state" role="status">
          <p>موردی برای نمایش پیدا نشد.</p>
        </div>
      )}

      {images.length > 0 && (
        <div className={style.imageGrid}>
          {images.map((image, index) => (
            <figure key={image.src} className={style.imageCard}>
              <button
                type="button"
                aria-label={`بزرگنمایی تصویر ${image.name}`}
                onClick={() => setZoomSrc(image.src)}
              >
                <Image
                  src={image.src}
                  alt={`${image.name}، نمونه ${(index + 1).toLocaleString("fa-IR")}`}
                  fill
                  sizes="(max-width: 576px) 50vw, (max-width: 992px) 33vw, 25vw"
                />
              </button>
              <figcaption>
                <Link href={image.href}>
                  {image.name}
                  <ArrowBackIcon aria-hidden="true" />
                </Link>
              </figcaption>
            </figure>
          ))}
        </div>
      )}

      {videos.length > 0 && (
        <div className={style.videos}>
          <h2 className="az-h2">ویدئو افکت‌ها</h2>
          <VideoShowcase videos={videos} />
        </div>
      )}

      <ZoomModal
        open={Boolean(zoomSrc)}
        onClose={() => setZoomSrc(null)}
        src={zoomSrc}
        alt="افکت هولوگرام"
      />
    </section>
  );
}
