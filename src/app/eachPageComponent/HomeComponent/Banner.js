"use client";
import React, { useEffect, useState } from "react";

import style from "../../Styles/HomeStyle/Banner.module.scss";
import Box from "@mui/material/Box";
import Link from "next/link";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Autoplay } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

//import redux
import { useDispatch } from "react-redux";
import { homePageBannerList } from "@/app/Store/thunks";

export default function Banner() {
  const dispatch = useDispatch();

  const [dataCome, setDataCome] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const dataComeAPI = await dispatch(homePageBannerList()).unwrap();
      setDataCome(dataComeAPI || []);
    };

    fetchData();
  }, [dispatch]);

  console.log(dataCome);

  const UrlsObject = dataCome?.map((data, i) => ({
    id: i,
    url: data.src,
    title: data.title,
    link: data.link,
  }));

  SwiperCore.use([Autoplay]);
  return (
    <section className={`${style.mainSection} mt-3 mb-4`}>
      <div className={`${style.resizeWidth} container position-relative`}>
        <Swiper
          loop={true}
          autoplay={{ delay: 4000 }}
          slidesPerView={1}
          pagination={{
            bulletClass: `swiper-pagination-bullet ${style["feature-pagination"]}`,
            dynamicBullets: true,
            clickable: true,
            // className : `${style.test}`,
          }}
          modules={[Pagination]}
          className={`${style.swiperMain} mySwiper`}
        >
          {UrlsObject.map((item) => (
            <SwiperSlide className={style.swiperslideHonors} key={item.id}>
              <Box
                key={item.id}
                className="h-100"
                component="img"
                sx={{
                  width: "100%",
                  borderRadius: 3,
                }}
                alt="slieds"
                src={item.url}
              />
              <div className={style.BannerTextDiv}>
                <div className="mb-2 Banner-title">
                  <h3>{item.title}</h3>
                </div>

                {item.link && (
                  <Link href={item.link} passHref>
                    <div className={style.buttonBanner}>
                      <button>ثبت سفارش</button>
                    </div>
                  </Link>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
