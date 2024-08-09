"use client";

import videoData from "../../../../public/json/Video.json";

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

export default function EachProductVideo() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [userInteracted, setUserInteracted] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [videoDurations, setVideoDurations] = useState(
    Array(videoData.length).fill("0:00")
  ); // Initialize with default duration
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
    if (!duration) return "0:00";
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
          <CardContent>
            <div className="d-flex flex-column">
              <div className={`${style.titleStyle} title`}>
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
          <div className={`${style.resetStyleInResponsive} d-flex flex-row gap-4`}>
            <div className={`${style.videorightSide} position-relative h-100`}>
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
                        src={video.poster} // Use the poster for each video
                        alt={video.title}
                        sx={{ borderRadius: "4px" , height: "100%" }}
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
                        <span> {video.coloredTitle}</span>
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
