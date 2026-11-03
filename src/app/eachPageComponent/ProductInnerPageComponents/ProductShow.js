"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import InventoryOutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import style from "../../Styles/ProductPage/innerProductPage/DynamicProductShow.module.scss";
import { token } from "@/app/Store/slice";
import ZoomModal from "@/app/BaseComponent/ZoomModal";
import { COMPANY, orderHref } from "@/app/utils/company";
import { mediaUrl } from "@/app/utils/productContent";

// The order form reads the product from here after login.
const storeSessionData = (prodCode) => {
  sessionStorage.setItem("lastPage", window.location.pathname);

  const saved = sessionStorage.getItem("PRODCODE");
  if (!saved) {
    sessionStorage.setItem("PRODCODE", prodCode);
  } else if (!saved.split(",").includes(prodCode)) {
    sessionStorage.setItem("PRODCODE", `${saved},${prodCode}`);
  }
};

function Gallery({ gallery, title, onZoom }) {
  const [current, setCurrent] = useState(0);

  if (gallery.length === 0) {
    return (
      <div className={style.mainMedia}>
        <div className={style.noMedia}>
          <InventoryOutlinedIcon aria-hidden="true" />
          <span>تصویری برای این محصول ثبت نشده است</span>
        </div>
      </div>
    );
  }

  const active = gallery[current] || gallery[0];

  return (
    <div className={style.gallery}>
      <div className={style.mainMedia}>
        {active.isVideo ? (
          <video
            key={active.src}
            src={active.src}
            poster={active.poster || undefined}
            controls
            playsInline
            preload="metadata"
            aria-label={title}
          />
        ) : (
          <button
            type="button"
            className={style.zoomButton}
            aria-label={`بزرگنمایی تصویر ${title}`}
            onClick={() => onZoom(active.src)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={active.src} alt={title} />
            <span className={style.zoomHint} aria-hidden="true">
              <ZoomInIcon />
            </span>
          </button>
        )}
      </div>

      {gallery.length > 1 && (
        <ul className={style.thumbs}>
          {gallery.map((media, index) => (
            <li key={media.src}>
              <button
                type="button"
                className={`${style.thumb} ${index === current ? style.thumbActive : ""}`}
                aria-label={`نمایش تصویر ${index + 1} از ${gallery.length}`}
                aria-current={index === current}
                onClick={() => setCurrent(index)}
              >
                {(media.isVideo ? media.poster : media.src) && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={media.isVideo ? media.poster : media.src}
                    alt=""
                    loading="lazy"
                  />
                )}
                {media.isVideo && <PlayArrowRoundedIcon aria-hidden="true" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function ProductShow({ product }) {
  const isLoggedIn = Boolean(useSelector(token));
  const [zoomSrc, setZoomSrc] = useState(null);

  return (
    <section className={`container ${style.summary}`}>
      <Gallery
        gallery={product.gallery}
        title={product.title}
        onZoom={setZoomSrc}
      />

      <div className={style.info}>
        <Link
          href={`/${encodeURIComponent(product.category)}`}
          className={style.categoryLink}
        >
          {product.category}
        </Link>
        <h1 className="az-h1">{product.title}</h1>
        {product.intro && (
          <p className={`az-lead ${style.intro}`}>{product.intro}</p>
        )}

        {product.specs.length > 0 && (
          <dl className={style.specs}>
            {product.specs.map((section) => (
              <div key={section.name} className={style.specRow}>
                <dt>{section.name}</dt>
                <dd>
                  {section.items.map((item) =>
                    section.type === "image" && item.src ? (
                      <button
                        key={item.name}
                        type="button"
                        className={style.specImage}
                        onClick={() => setZoomSrc(mediaUrl(item.src))}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={mediaUrl(item.src)} alt="" loading="lazy" />
                        {item.name}
                      </button>
                    ) : (
                      <span key={item.name} className={style.specValue}>
                        {item.name}
                      </span>
                    ),
                  )}
                </dd>
              </div>
            ))}
          </dl>
        )}

        <div className={style.actionBox}>
          <p>
            برای دریافت قیمت این محصول، مشخصات سفارش خود را ثبت کنید. قیمت بر
            اساس تیراژ، ابعاد و جنس محاسبه می‌شود.
          </p>
          <div className={style.actions}>
            <Link
              href={orderHref(isLoggedIn, product.rawName, product.code)}
              className="az-btn az-btn--primary"
              onClick={() => storeSessionData(product.code)}
            >
              استعلام قیمت
              <ArrowBackIcon aria-hidden="true" />
            </Link>
            <a href={COMPANY.phoneHref} className="az-btn az-btn--outline">
              <CallOutlinedIcon aria-hidden="true" />
              نیاز به مشاوره دارید؟
            </a>
          </div>
        </div>
      </div>

      <ZoomModal
        open={Boolean(zoomSrc)}
        onClose={() => setZoomSrc(null)}
        src={zoomSrc}
        alt={product.title}
      />
    </section>
  );
}
