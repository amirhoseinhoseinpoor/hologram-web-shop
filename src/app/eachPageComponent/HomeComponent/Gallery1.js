"use client";

import React from "react";
import style from "../../Styles/HomeStyle/Gallery1.module.scss";
import gallery from "/public/json/Gallery.json";
import Link from "next/link";
import { Box } from "@mui/material";

// Import Swiper React components and styles
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

export default function Gallery1() {
  return (
    <section className="container">
      <div className={`${style.MainDiv} d-flex flex-row w-100`}>
        <div className={`${style.FirstDivTextSizing} d-flex flex-column`}>
          <p>انواع افکت‌ها امنیتی</p>
          <button type="button">مشاهده همه</button>
        </div>
        <div className={`${style.SecondDivtextSizing}`}>
          <Swiper
            loop={true}
            // autoplay={{ delay: 4000 }}
            spaceBetween={2}
            slidesPerView={2}
            pagination={{
              bulletClass: `swiper-pagination-bullet ${style["feature-pagination"]}`,
              dynamicBullets: true,
              clickable: true,
            }}
            breakpoints={{
              770: {
                slidesPerView: 3,
              },
              990: {
                slidesPerView: 5,
              },
            }}
            navigation={{
              nextEl: ".review-swiper-button-next2",
              prevEl: ".review-swiper-button-prev2",
            }}
            modules={[Navigation, Pagination, Autoplay]}
            className={`${style.fixSwiper} mySwiper`}
          >
            {gallery
              .filter((item) => item.type === "secure")
              .map((item, index) =>
                item.content.map((contentItem) => (
                  <SwiperSlide
                    className={style.swiperslideHonors}
                    key={`${index}-${contentItem.title}`}
                  >
                    <Link passHref href={`/Honors/`}>
                      <Box
                        key={contentItem.id}
                        className="h-100"
                        component="img"
                        sx={{
                          width: "100%",
                          maxHeight: "50%",
                          borderRadius: 3,
                        }}
                        alt={contentItem.title}
                        src={contentItem.src}
                      />
                      {contentItem.title}
                    </Link>
                  </SwiperSlide>
                ))
              )}
          </Swiper>
          <div className="review-swiper-button-next2">Next</div>
          <div className="review-swiper-button-prev2">Prev</div>
        </div>
      </div>
    </section>
  );
}
