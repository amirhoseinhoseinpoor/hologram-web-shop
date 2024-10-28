"use client";

import React, { useEffect } from "react";

import style from "../../Styles/HomeStyle/Exhibition.module.scss";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Box from "@mui/material/Box";
import Link from "next/link";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Autoplay } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

// import redux
import { useSelector, useDispatch } from "react-redux";
import { homePageExhibitionList } from "../../Store/thunks";
import { exhibitionListData } from "@/app/Store/slice";

export default function Exhibition() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(homePageExhibitionList());
    };
    fetchData();
  }, [dispatch]);

  const exhibition = useSelector(exhibitionListData);


  const addKeys = (items) => {
    return items?.map((item, index) => ({
      ...item,
      id: index,
      subItems: item.slides ? addKeys(item.slides) : [],
    }));
  };

  const mainItemObject = addKeys(exhibition);

  SwiperCore.use([Autoplay]);
  function fixTitleSize(text) {
    var shortTitle;
    if (text.length > 60) {
      shortTitle = text.slice(0, 60) + "...";
      return shortTitle;
    } else {
      return text;
    }
  }

  return (
    <section className={style.mainbackground}>
      <div
        className={`d-flex flex-row container-lg h-100 ${style.exhibitionresponsivemaindiv}`}
      >
        <div
          className={`${style.rigthtextslide} ${style.rprighttext} d-flex flex-column justify-content-center`}
        >
          <div className="sometext">
            {/* {mainItemObject?.map((item , index) => ( ))} */}
            <React.Fragment>
              <span>حضور ما در سرتاسر جهان، نشان‌دهنده تعهد ما به </span>
              <span className={`${style.slidernexttext} mt-1`}>
                پیشرفت و توسعه است...
              </span>
            </React.Fragment>
          </div>
          <div className={`mt-4 d-flex gap-3 ${style.rpexhibitionarrow}`}>
            <button
              className={`${style.arrowforward} review-swiper-button-prev`}
            >
              <ArrowForwardIcon></ArrowForwardIcon>
            </button>
            <button
              className={`${style.arrowbackward} review-swiper-button-next`}
            >
              <ArrowBackIcon></ArrowBackIcon>
            </button>
          </div>
        </div>
        <div className={style.leftslidewidth}>
          {exhibition?.length ? (
            <Swiper
              loop={true}
              autoplay={{ delay: 4000 }}
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                990: {
                  slidesPerView: 2,
                },
              }}
              navigation={{
                nextEl: ".review-swiper-button-next",
                prevEl: ".review-swiper-button-prev",
              }}
              modules={[Navigation]}
              className={`${style.swiperCustom} mySwiper container`}
            >
              {mainItemObject?.map((item, index) => (
                <React.Fragment key={index}>
                  {/* {mainItem.slides.map((item, index) => ())} */}
                  <SwiperSlide key={index}>
                    <Link
                      className="text-decoration-none"
                      href={`/Exhibition/${item.title}`}
                      style={{ color: "black" }}
                      passHref
                    >
                      <div className={style.resetexhibition}>
                        <Box
                          className={`${style.adjustaspectratioinner} h-100`}
                          component="img"
                          sx={{
                            width: "100%",
                            maxHeight: "100%",
                            objectFit: "cover",
                            aspectRatio: 2.4,
                            borderRadius: 3,
                          }}
                          alt="slieds"
                          src={`${process.env.NEXT_PUBLIC_BACK_END_SERVER}/system/download/${item.src}`}
                        />
                        <p>{fixTitleSize(item.title)}</p>
                      </div>
                    </Link>
                  </SwiperSlide>
                </React.Fragment>
              ))}
            </Swiper>
          ) : (
            <p>Not enough slides to display in loop mode</p>
          )}
        </div>
      </div>
    </section>
  );
}
