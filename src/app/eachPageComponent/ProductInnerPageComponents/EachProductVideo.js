"use client";

// import videoData from "../../../../public/json/Video.json";

import React, { useRef, useEffect, useState } from "react";
import style from "../../Styles/ProductPage/innerProductPage/DynamicProductVideo.module.scss";
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

export default function EachProductVideo({productData}) {

  const videoData = productData.media;

  

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [userInteracted, setUserInteracted] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [videoDurations, setVideoDurations] = useState(
    Array(videoData.length).fill("0:00")
  ); 
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

    const handleLoadedMetadata = () => {
      
      const duration = video.duration;
      setVideoDurations((prevDurations) => {
        const newDurations = [...prevDurations];
        newDurations[currentVideoIndex] = duration;
        return newDurations;
      });
    };

    video.addEventListener("ended", handleVideoEnd);
    video.addEventListener("loadedmetadata", handleLoadedMetadata); // Listen to loaded metadata

    return () => {
      video.removeEventListener("ended", handleVideoEnd);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata); // Cleanup metadata listener
    };
  }, [currentVideoIndex]);

  useEffect(() => {
    const video = videoRef.current;
    video.onplaying = () => {
      setVideoEnded(true);
    };
    if (videoRef.current && userInteracted) {
      videoRef.current.play();
    }
  }, [currentVideoIndex]);

  // Preload all video metadata when the component mounts
  useEffect(() => {
    const preloadVideoDurations = () => {
      videoData.forEach((video, index) => {
        const videoElement = document.createElement("video");
        videoElement.src = video.src;
        videoElement.preload = "metadata";
        videoElement.onloadedmetadata = () => {
          const duration = videoElement.duration;
          setVideoDurations((prevDurations) => {
            const newDurations = [...prevDurations];
            newDurations[index] = duration;
            return newDurations;
          });
        };
      });
    };

    preloadVideoDurations();
  }, []);

  // Helper function to format duration
  const formatDuration = (duration) => {
    if (!duration || isNaN(duration)) return "0:00";
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <section className={`mt-5 mb-5 container ${style.responsiveSection}`}>
      <div className={`${style.adjustWidth}`}>
        <Card className="position-relative">
          <CardContent className="p-2">
            <div className="d-flex flex-column">
              <div className={`${style.titleStyle} title`}>
                <span>عنوان استاتیک</span>
                <span className={style.titleColor}>
                  {" "}
                  {videoData[currentVideoIndex].coloredTitle}
                </span>
              </div>
            </div>
          </CardContent>
          <div
            className={`${style.resetStyleInResponsive} d-flex flex-row gap-4`}
          >
            <div className={`${style.videorightSide} position-relative h-100`}>
              <CardMedia
                id="video"
                style={{ aspectRatio: "2/1" }}
                component="video"
                src={`${process.env.NEXT_PUBLIC_BACK_END_SERVER}/system/download/${videoData[currentVideoIndex].src}`}
                poster={`${process.env.NEXT_PUBLIC_BACK_END_SERVER}/system/download/${videoData[currentVideoIndex].poster}`}
                sx={{ borderRadius: "4px" }}
                controls
                ref={videoRef}
              />
              <p className="purchesSize mt-2">
              {videoData[currentVideoIndex].title}
              </p>
              <p className="NormalTextSizing mt-2">
              {videoData[currentVideoIndex].description}
              </p>
              {!videoEnded && (
                <>
                  <div className={style.BelowContentFixIcon}>
                    <svg
                      width={55}
                      height={54}
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
                </>
              )}
            </div>

            <div className={`${style.fixLeftSideVideo}`}>
              {videoData.map((video, index) => (
                <Card
                  key={index} // Added key prop
                  className={style.MainBOXCardStyle}
                  onClick={() => handleThumbnailClick(index)}
                >
                  <div className="d-flex flex-row gap-2">
                    <div className="position-relative w-50">
                      <CardMedia
                        component="img"
                        src={`${process.env.NEXT_PUBLIC_BACK_END_SERVER}/system/download/${video.poster}`} 
                        alt={`${process.env.NEXT_PUBLIC_BACK_END_SERVER}/system/download/${video.title}`}
                        sx={{ borderRadius: "4px", height: "100%" }}
                      />
                      <div className={style.BelowContentFixIcon}>
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
                      {/* Display video duration */}
                      <div className={style.duration}>
                        {formatDuration(videoDurations[index])}
                      </div>
                    </div>
                    <CardContent
                      className={`${style.resetPaddingMui} w-50 m-auto`}
                    >
                      <div
                        dir="rtl"
                        className={`${style.titleStyle} description`}
                      >
                        <span>{video.title}</span>
                        
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
