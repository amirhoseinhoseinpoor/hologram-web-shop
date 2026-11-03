"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import style from "./Home.module.scss";

// Banners are managed from the admin panel.
export default function BannerSlider({ banners }) {
  if (!banners.length) return null;

  return (
    <Swiper
      loop={banners.length > 1}
      autoplay={{ delay: 5000, disableOnInteraction: true }}
      pagination={{ clickable: true }}
      modules={[Autoplay, Pagination]}
      className={style.bannerSwiper}
    >
      {banners.map((banner, index) => {
        const image = (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={banner.url}
            alt={banner.title || "آذرهولوگرام"}
            loading={index === 0 ? "eager" : "lazy"}
          />
        );
        return (
          <SwiperSlide key={banner.url} className={style.bannerSlide}>
            {banner.link ? <Link href={banner.link}>{image}</Link> : image}
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
