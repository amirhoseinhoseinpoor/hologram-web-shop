"use client";

import React , {useEffect} from "react";

import style from "../../Styles/HomeStyle/Honors.module.scss";
import Box from "@mui/material/Box";
import Link from "next/link";
// import honor from "/public/json/HonorsPage.json";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Pagination } from "swiper/modules";
import { Autoplay } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

// import redux 
import { useDispatch , useSelector } from "react-redux";
import { homePageHonorsList } from "@/app/Store/thunks";
import { honorsListData } from "@/app/Store/slice";

export default function Honors() {
  SwiperCore.use([Autoplay]);
  const dispatch = useDispatch();

  useEffect( () => {
    const fetchData = async () => {
     await dispatch(homePageHonorsList())
    }
    fetchData();
   
  }, [dispatch]);

  const honor = useSelector(honorsListData);
  console.log(honor);
  

  return (
    <section style={{marginTop : "100px"}} className={`${style.mainbackgroundhonor}  mb-5`}>
      <div
        className={`${style.rigthtextslide} d-flex flex-column justify-content-center container`}
      >
        <div className="d-flex flex-row justify-content-between mt-3 mb-2">
          <div className={`${style.adjustROWSintitle} title mb-2`}>
            <p className="ms-1">افتخاراتی که به آن‌ها</p>
            <p className={`${style.slidernexttext} mt-1`}>افتخار می‌کنیم...</p>
          </div>
          <div>
            <Link href={"/Honors"} passHref>
              <button className={style.buttonStyleForAll}>
                همه افتخارات{" "}
                <svg
                  width={20}
                  height={21}
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.57 6.42969L3.5 12.4997L9.57 18.5697"
                    stroke="white"
                    strokeWidth={2}
                    strokeMiterlimit={10}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20.4999 12.5H3.66992"
                    stroke="white"
                    strokeWidth={2}
                    strokeMiterlimit={10}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </Link>
          </div>
        </div>

        {/* <div className="mt-4 d-flex gap-3">
            <button
              className={`${style.arrowforward} review-swiper-button-prev2`}
            >
              <ArrowForwardIcon></ArrowForwardIcon>
            </button>
            <button
              className={`${style.arrowbackward} review-swiper-button-next2`}
            >
              <ArrowBackIcon></ArrowBackIcon>
            </button>
          </div> */}
      </div>
      <div className={`${style.honorsFixPagination} container`}>
        <Swiper
          loop={true}
          autoplay={{ delay: 4000 }}
          spaceBetween={8}
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
              slidesPerView: 4,
            },
          }}
          navigation={{
            nextEl: ".review-swiper-button-next2",
            prevEl: ".review-swiper-button-prev2",
          }}
          modules={[Navigation , Pagination]}
          className={`${style.fixSwiper} mySwiper`}
        >
          {honor?.map((item , index) => (
            <SwiperSlide className={style.swiperslideHonors} key={index}>
              <Link passHref href={`/Honors/${item.title}`}>
                <Box
                  key={index}
                  className="h-100"
                  component="img"
                  sx={{
                    width: "100%",
                    maxHeight: "50%",
                    borderRadius: 3,
                  }}
                  alt={item.title}
                  src={item.src}
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
