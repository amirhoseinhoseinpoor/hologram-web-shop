"use client";

import React, { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import style from "../Styles/EffectType/EffectType.module.scss";
import MainLayout from "../layouts/MainLayout";
import PageIntro from "../Components/ui/PageIntro";
import VideoShowcase from "../Components/VideoShowcase";
import ZoomModal from "../BaseComponent/ZoomModal";
import { productListData, headerListData } from "../Store/slice";
import { list } from "../Store/thunks";
import { toProductView } from "../utils/productContent";

const PRODUCTS_NAV_LINK = "#test2";

const normalizeString = (str = "") => str.replace(/\s+/g, "").toLowerCase();

export default function EffectTypeWrapper() {
  return (
    <MainLayout>
      <PageIntro
        eyebrow="افکت‌ها"
        title="انواع افکت‌های هولوگرامی"
        description="در دنیای پر آشوب جعل و تقلب، هولوگرام‌ها به مثابه گاردهای نامرئی عمل می‌کنند و با ظرافت و دقت، اصالت و کیفیت را تضمین می‌کنند."
      />
      <Suspense
        fallback={
          <div className="container az-section">
            <div className="az-spinner" />
          </div>
        }
      >
        <EffectType />
      </Suspense>
    </MainLayout>
  );
}

function EffectType() {
  const dispatch = useDispatch();
  const router = useRouter();
  const type = useSearchParams().get("type");

  const headerData = useSelector(headerListData);
  const products = useSelector(productListData);

  const [searchTerm, setSearchTerm] = useState("");
  const [zoomSrc, setZoomSrc] = useState(null);

  useEffect(() => {
    dispatch(list());
  }, [dispatch]);

  const categories = useMemo(
    () =>
      headerData?.content?.find((item) => item.link === PRODUCTS_NAV_LINK)
        ?.subItems || [],
    [headerData],
  );

  const activeCategory =
    categories.find((category) => category.title === type) || categories[0];

  const views = useMemo(() => {
    if (!activeCategory) return [];
    const names = (activeCategory.subItems || []).map((item) => item.title);
    const term = normalizeString(searchTerm);
    return (products || [])
      .map(toProductView)
      .filter((view) => names.includes(view.name))
      .filter((view) => normalizeString(view.name).includes(term));
  }, [activeCategory, products, searchTerm]);

  const images = views.flatMap((view) =>
    view.gallery
      .filter((media) => !media.isVideo)
      .map((media) => ({ ...media, name: view.name, href: view.href })),
  );
  const videos = views.flatMap((view) =>
    view.videos.map((video) => ({
      ...video,
      title: video.title || view.name,
    })),
  );

  const isLoading = !products || !headerData;

  return (
    <section className="az-section container">
      <div className={style.toolbar}>
        <div
          className={style.chips}
          role="group"
          aria-label="دسته‌های محصول"
        >
          {categories.map((category) => (
            <button
              key={category.link}
              type="button"
              className={`az-chip ${
                category.title === activeCategory?.title ? "az-chip--active" : ""
              }`}
              aria-pressed={category.title === activeCategory?.title}
              onClick={() =>
                router.replace(
                  `/EffectType?type=${encodeURIComponent(category.title)}`,
                  { scroll: false },
                )
              }
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

      {isLoading && (
        <div className={style.imageGrid} aria-hidden="true">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={`az-skeleton ${style.skeleton}`} />
          ))}
        </div>
      )}

      {!isLoading && images.length === 0 && videos.length === 0 && (
        <div className="az-state" role="status">
          <p>موردی برای نمایش پیدا نشد.</p>
        </div>
      )}

      {images.length > 0 && (
        <div className={style.imageGrid}>
          {images.map((image) => (
            <figure key={image.src} className={style.imageCard}>
              <button
                type="button"
                aria-label={`بزرگنمایی تصویر ${image.name}`}
                onClick={() => setZoomSrc(image.src)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image.src} alt={image.name} loading="lazy" />
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
