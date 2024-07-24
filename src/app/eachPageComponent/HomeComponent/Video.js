"use client";

import videoData from "../../../../public/json/Video.json";

import React, { useRef, useEffect, useState } from "react";
import style from "../../Styles/HomeStyle/Video.module.scss";
import { Card, CardContent, CardMedia } from "@mui/material";
import Box from "@mui/material/Box";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Autoplay } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

export default function Video() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [userInteracted, setUserInteracted] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef();

  const handleThumbnailClick = (index) => {
    setCurrentVideoIndex(index);
  };

  useEffect(() => {
    const video = videoRef.current;

    const handleVideoEnd = () => {
      const nextIndex = (currentVideoIndex + 1) % videoData.length;
      setCurrentVideoIndex(nextIndex);
      setUserInteracted(true);
    };

    video.addEventListener("ended", handleVideoEnd);

    return () => {
      video.removeEventListener("ended", handleVideoEnd);
    };
  }, [currentVideoIndex]);

  useEffect(() => {
    const video = videoRef.current;
    video.onplaying = () => {
      setVideoEnded(true);
    };
    if (videoRef.current && userInteracted) {
      // videoRef.current.load();
      videoRef.current.play();
    }
  }, [currentVideoIndex]);

  return (
    <section className={`mt-5 mb-5 container ${style.responsiveSection}`}>
      <div className={`${style.adjustWidth}`}>
        <Card className="position-relative">
          <CardContent>
            <div className="d-flex flex-column">
              <div className={`${style.titleStyle} title `}>
                <span>{videoData[currentVideoIndex].title}</span>
                <span className={style.titleColor}>
                  {" "}
                  {videoData[currentVideoIndex].coloredTitle}
                </span>
              </div>
              <p className="subtitle">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
                استفاده از طراحان گرافیک است.
              </p>
            </div>
          </CardContent>
          <CardMedia
            id="video"
            component="video"
            src={videoData[currentVideoIndex].src}
            poster={videoData[currentVideoIndex].poster}
            sx={{ borderRadius: "4px" }}
            controls
            ref={videoRef}
          />

          {!videoEnded && (
            <>
              <Box
                className={`${style.posterIcon} d-none d-lg-block d-xl-block`}
                component="img"
                alt="image."
                src="/HomeImages/Video icon.png"
              />
              <Box
                className={`${style.posterIconArrow} d-none d-lg-block d-xl-block`}
                component="img"
                sx={{
                  width: "60px",
                  height: "25px",
                  objectFit: "cover",
                  aspectRatio: 1.48,
                }}
                alt="image."
                src="/HomeImages/Video icon arrow.png"
              />
            </>
          )}
        </Card>
        {/* <div className={style.belowImage}>
          {videoData.map((video, index) => (
            <div className="d-flex flex-column" key={index}>
              <div>
                <img
                  src={video.poster}
                  alt={video.title}
                  className={style.thumbnail}
                  onClick={() => handleThumbnailClick(index)}
                />
              </div>
              <div>
                <p>{video.title}</p>
              </div>
            </div>
          ))}
        </div> */}

        <div dir="ltr" className="position-relative mt-4">
          <Swiper
            loop={true}
            spaceBetween={2}
            slidesPerView={2}
            breakpoints={{
              770: {
                slidesPerView: 2,
              },
              990: {
                slidesPerView: 3.75,
              },
            }}
            navigation={{
              nextEl: ".review-swiper-button-next2",
              prevEl: ".review-swiper-button-prev2",
            }}
            modules={[Navigation]}
            className={`${style.swiperWrapergap} mySwiper`}
          >
            <div className={style.belowImage}>
              {videoData.map((video, index) => (
                <SwiperSlide
                  className={`${style.resetAlignSelf} d-flex flex-column`}
                  key={index}
                >
                  <Card
                    className={style.MainBOXCardStyle}
                    onClick={() => handleThumbnailClick(index)}
                  >
                    <div className="position-relative">
                      <CardMedia
                        component="img"
                        src={videoData[currentVideoIndex].poster}
                        alt={video.title}
                        sx={{ borderRadius: "4px" }}
                        controls
                      />
                      <div className={style.BelowContentFixIcon}>
                        <svg
                          width={43}
                          height={42}
                          viewBox="0 0 43 42"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M16.25 38.5H26.75C35.5 38.5 39 35 39 26.25V15.75C39 7 35.5 3.5 26.75 3.5H16.25C7.5 3.5 4 7 4 15.75V26.25C4 35 7.5 38.5 16.25 38.5Z"
                            stroke="#333333"
                            strokeWidth={3}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M16.4248 20.9991V18.4091C16.4248 15.0666 18.7873 13.7191 21.6748 15.3816L23.9148 16.6766L26.1548 17.9716C29.0423 19.6341 29.0423 22.3641 26.1548 24.0266L23.9148 25.3216L21.6748 26.6166C18.7873 28.2791 16.4248 26.9141 16.4248 23.5891V20.9991Z"
                            stroke="#333333"
                            strokeWidth={3}
                            strokeMiterlimit={10}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>

                    <CardContent className={style.resetPaddingMui}>
                      {/* <p dir="rtl">{video.title}</p> */}
                      <div
                        dir="rtl"
                        className={`${style.titleStyle} discription `}
                      >
                        <span>{video.title}</span>
                        <span> {video.coloredTitle}</span>
                      </div>
                    </CardContent>
                  </Card>
                </SwiperSlide>
              ))}
            </div>
          </Swiper>
          <div className={style.buttonNextStyle}>
            <button
              aria-label="Play video"
              className="review-swiper-button-next2"
            >
              <svg
                width={27}
                height={30}
                viewBox="0 0 42 43"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.5928 35.3606L27.0028 23.9506C28.3503 22.6031 28.3503 20.3981 27.0028 19.0506L15.5928 7.64062"
                  stroke="#333333"
                  strokeWidth={3}
                  strokeMiterlimit={10}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <div className={style.buttonPrevStyle}>
            <button
              aria-label="Play video"
              className="review-swiper-button-prev2"
            >
              <svg
                width={27}
                height={30}
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.4998 20.42L8.97984 13.9C8.20984 13.13 8.20984 11.87 8.97984 11.1L15.4998 4.57996"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeMiterlimit={10}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
