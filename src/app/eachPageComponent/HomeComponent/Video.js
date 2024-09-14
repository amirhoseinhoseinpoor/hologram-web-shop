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
    <section style={{marginTop : "100px"}} className={` mb-5 container ${style.responsiveSection}`}>
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
              <svg
                className={`${style.posterIcon} d-none d-lg-block d-xl-block`}
                width={84}
                height={84}
                viewBox="0 0 84 84"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.6"
                  d="M42 77C61.33 77 77 61.33 77 42C77 22.67 61.33 7 42 7C22.67 7 7 22.67 7 42C7 61.33 22.67 77 42 77Z"
                  fill="white"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M31.8496 42.0002V36.8202C31.8496 30.1352 36.5746 27.4402 42.3496 30.7652L46.8296 33.3552L51.3096 35.9452C57.0846 39.2702 57.0846 44.7302 51.3096 48.0552L46.8296 50.6452L42.3496 53.2352C36.5746 56.5602 31.8496 53.8302 31.8496 47.1802V42.0002Z"
                  fill="#333333"
                  stroke="#333333"
                  strokeWidth="1.5"
                  strokeMiterlimit={10}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
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
                          viewBox="0 0 84 84"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            opacity="0.6"
                            d="M42 77C61.33 77 77 61.33 77 42C77 22.67 61.33 7 42 7C22.67 7 7 22.67 7 42C7 61.33 22.67 77 42 77Z"
                            fill="white"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M31.8496 42.0002V36.8202C31.8496 30.1352 36.5746 27.4402 42.3496 30.7652L46.8296 33.3552L51.3096 35.9452C57.0846 39.2702 57.0846 44.7302 51.3096 48.0552L46.8296 50.6452L42.3496 53.2352C36.5746 56.5602 31.8496 53.8302 31.8496 47.1802V42.0002Z"
                            fill="#333333"
                            stroke="#333333"
                            strokeWidth="1.5"
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
