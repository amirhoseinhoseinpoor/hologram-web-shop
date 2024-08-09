"use client";
import React, { useRef, useEffect, useState } from "react";
import style from "../Styles/EffectType/EffectType.module.scss";
import videoData from "/public/json/EffectType.json";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardMedia } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

export default function EffectType() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  const [currentVideoIndex, setCurrentVideoIndex] = useState(null);
  const [userInteracted, setUserInteracted] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [videoDurations, setVideoDurations] = useState([]);
  const [activeTab, setActiveTab] = useState(type || "");

  const videoRef = useRef();

  const filteredContent = activeTab
    ? videoData.find((item) => item.fillter === activeTab)?.content || []
    : videoData.flatMap((item) => item.content);

  useEffect(() => {
    if (type) {
      setActiveTab(type);
    }
  }, [type]);

  useEffect(() => {
    if (filteredContent.length > 0 && currentVideoIndex === null) {
      const firstVideoIndex = filteredContent.findIndex(
        (item) => item.type === "video"
      );
      if (firstVideoIndex !== -1) {
        setCurrentVideoIndex(firstVideoIndex);
      }
    }
  }, [filteredContent]);

  const handleThumbnailClick = (index) => {
    setCurrentVideoIndex(index);
    setUserInteracted(true);
  };

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      const handleVideoEnd = () => {
        const nextIndex = (currentVideoIndex + 1) % filteredContent.length;
        setCurrentVideoIndex(nextIndex);
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
      video.addEventListener("loadedmetadata", handleLoadedMetadata);

      return () => {
        video.removeEventListener("ended", handleVideoEnd);
        video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      };
    }
  }, [currentVideoIndex, filteredContent]);

  useEffect(() => {
    const video = videoRef.current;
    if (video && userInteracted) {
      video.play();
    }
  }, [currentVideoIndex, userInteracted]);

  useEffect(() => {
    const preloadVideoDurations = () => {
      filteredContent.forEach((video, index) => {
        if (video.type === "video") {
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
        }
      });
    };

    preloadVideoDurations();
  }, [filteredContent]);

  const formatDuration = (duration) => {
    if (!duration) return "0:00";
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const currentVideo =
    currentVideoIndex !== null ? filteredContent[currentVideoIndex] : null;

  return (
    <>
      <Header />
      <section className={`mt-5 mb-5 container ${style.responsiveSection}`}>
        <div>
          <Tabs
            id="controlled-tab-example"
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
          >
            
            {videoData.map((item, index) => (
              <Tab
                key={index}
                eventKey={item.fillter}
                title={
                  <div className="d-flex flex-column">
                    <p className={`${style.TabTitleText} text-end mb-2 VodeoDisSizing`}>{item.fillter}</p>
                    <Box
                      className={`${style.TabImageIconsEach} `}
                      component="img"
                      sx={{
                        width : "100%",
                        objectFit: "cover",
                        // aspectRatio: 1.48,
                      }}
                      alt="image."
                      src={item.tabSrc}
                    />
                  </div>
                }
              />
            ))}
          </Tabs>

          <React.Fragment>
            <div className={`${style.adjustWidth}`}>
              {currentVideo && (
                <Card className="position-relative mt-5 mb-3">
                  <div className="mb-3 me-3">
                    <p className="sometext">ویدئو افکت‌ها</p>
                  </div>
                  <div
                    className={`${style.resetStyleInResponsive} d-flex flex-column gap-2`}
                  >
                    <div
                      className={`${style.videorightSide} position-relative h-100`}
                    >
                      <CardMedia
                        id="video"
                        component="video"
                        src={currentVideo.src}
                        poster={currentVideo.poster}
                        sx={{ borderRadius: "4px" , maxHeight : "500px" }}
                        controls
                        ref={videoRef}
                      />
                      <CardContent>
                        <div className="d-flex flex-column">
                          <div className={`${style.titleStyle} purchesSize`}>
                            <span>{currentVideo.title}</span>
                            
                          </div>
                          <p className="VodeoDisSizing">
                            {currentVideo.description}
                          </p>
                        </div>
                      </CardContent>
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
                  </div>
                </Card>
              )}
              <div className={`${style.fixLeftSideVideo}`}>
                {filteredContent.map((video, index) =>
                  video.type === "img" ? null : (
                    <Card
                      key={index}
                      className={style.MainBOXCardStyle}
                      onClick={() => handleThumbnailClick(index)}
                    >
                      <div className="d-flex flex-column gap-2">
                        <div className="position-relative">
                          <CardMedia
                            component="img"
                            src={video.poster}
                            alt={video.title}
                            sx={{
                              borderRadius: "4px",
                              height: "100%",
                            }}
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
                          <div className={style.duration}>
                            {formatDuration(videoDurations[index])}
                          </div>
                        </div>
                        <CardContent className={`${style.resetPaddingMui} `}>
                          <div dir="rtl" className={`${style.titleStyle}`}>
                            <p className="VodeoDisSizing">{video.title}</p>
                            <span className="discription mt-1">
                              {video.description}
                            </span>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  )
                )}
              </div>
            </div>
          </React.Fragment>
        </div>
      </section>
      <Footer />
    </>
  );
}
