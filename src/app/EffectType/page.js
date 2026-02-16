"use client";
import React, { useRef, useEffect, useState, Suspense, useMemo } from "react";
import style from "../Styles/EffectType/EffectType.module.scss";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardMedia } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Modal from "react-bootstrap/Modal";
import MainLayout from "../layouts/MainLayout";

// import redux
import { useSelector, useDispatch } from "react-redux";
import { productListData } from "../Store/slice";
import { list } from "../Store/thunks";
import { headerListData } from "../Store/slice";

export default function EffectTypeWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EffectType />
    </Suspense>
  );
}

function EffectType() {
  const dispatch = useDispatch();

  const typeCome = useSelector(headerListData);

  const typeComeContent = typeCome?.content;

  const fillterdType = typeComeContent?.find((item) => item.link == "#test2");

  const dataCome = useSelector(productListData);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(list());
    };

    fetchData();
  }, [dispatch]);

  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentVideoIndex, setCurrentVideoIndex] = useState(null);
  const [userInteracted, setUserInteracted] = useState(false);
  // const [videoEnded, setVideoEnded] = useState(false);
  const [videoDurations, setVideoDurations] = useState([]);
  const [activeTab, setActiveTab] = useState(type || "");
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const videoRef = useRef();

  const normalizeString = (str) => str.replace(/\s+/g, "").toLowerCase();

  const filteredContent = useMemo(() => {
    if (!fillterdType?.subItems) return []; // Check for valid subItems

    let result = activeTab
      ? fillterdType.subItems.filter((item) => item.title === activeTab) // Filter subItems based on activeTab
      : fillterdType.subItems; // Return all subItems if no activeTab

    // Perform search filter based on the search term
    if (searchTerm) {
      result = result.filter((item) =>
        normalizeString(item.title || "").includes(normalizeString(searchTerm))
      );
    }

    // Ensure result is always an array (even if it's just one item)
    return Array.isArray(result) ? result : [result];
  }, [activeTab, searchTerm, fillterdType]);

  const finalData = filteredContent.flatMap((item) =>
    item.subItems.flatMap((itemInner) => {
      if (itemInner.title) {
        // Filter the products from dataCome that match the title of itemInner
        const matchingProducts = dataCome?.filter((product) => {
          const productPathSegments = product.name.split(" - "); // Split the product name into segments
          const lastSegment = productPathSegments[productPathSegments.length - 1]; // Get the last segment
          return lastSegment === itemInner.title; // Check if the last segment matches itemInner.title
        });
        return matchingProducts;
      }
      return [];
    })
  );

  useEffect(() => {
    if (type) {
      setActiveTab(type);
    }
  }, [type]);

  useEffect(() => {
    if (finalData.length > 0 && currentVideoIndex === null) {
      // const firstVideoIndex = finalData.findIndex(
      //   (item) => item.type === "video"
      // );
      // if (firstVideoIndex !== -1) {  }
      setCurrentVideoIndex(0);
    }
  }, [finalData, currentVideoIndex]);

  const handleThumbnailClick = (index) => {
    setCurrentVideoIndex(index);
    setUserInteracted(true);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      const handleVideoEnd = () => {
        const nextIndex = (currentVideoIndex + 1) % filteredContent.length;
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
      video.addEventListener("loadedmetadata", handleLoadedMetadata);

      return () => {
        video.removeEventListener("ended", handleVideoEnd);
        video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      };
    }
  }, [currentVideoIndex, finalData]);

  useEffect(() => {
    const video = videoRef.current;
    if (video && userInteracted) {
      video.play();
    }
  }, [currentVideoIndex, userInteracted]);

  // useEffect(() => {
  //   const preloadVideoDurations = () => {
  //     finalData.forEach((video, index) => {
  //       if (video.type === "video") {
  //         const videoElement = document.createElement("video");
  //         videoElement.src = video.src;
  //         videoElement.preload = "metadata";
  //         videoElement.onloadedmetadata = () => {
  //           const duration = videoElement.duration;
  //           setVideoDurations((prevDurations) => {
  //             const newDurations = [...prevDurations];
  //             newDurations[index] = duration;
  //             return newDurations;
  //           });
  //         };
  //       }
  //     });
  //   };
  //   preloadVideoDurations();
  // }, [finalData]);

  // const formatDuration = (duration) => {
  //   if (!duration) return "0:00";
  //   const minutes = Math.floor(duration / 60);
  //   const seconds = Math.floor(duration % 60)
  //     .toString()
  //     .padStart(2, "0");
  //   return `${minutes}:${seconds}`;
  // };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentVideoIndex(null); // Reset the video index when searching
  };

  const currentVideo =
    currentVideoIndex !== null ? finalData[0]?.media[currentVideoIndex] : null;

  return (
    <>
      <MainLayout>
        <section className={`mt-5 mb-5 container ${style.responsiveSection}`}>
          <div>
            <Tabs
              id="controlled-tab-example"
              activeKey={activeTab}
              onSelect={(k) => setActiveTab(k)}
            >
              {fillterdType?.subItems.map((item, index) => (
                <Tab
                  key={index}
                  eventKey={item.title}
                  title={
                    <div className="d-flex flex-column">
                      <p
                        className={`${style.TabTitleText} text-end mb-2 VodeoDisSizing`}
                      >
                        {item.title}
                      </p>
                      <Box
                        className={`${style.TabImageIconsEach} `}
                        component="img"
                        sx={{
                          width: "100%",
                          objectFit: "cover",
                        }}
                        alt="image."
                        src="/HomeImages/SecureTab1.png"
                      />
                    </div>
                  }
                />
              ))}
            </Tabs>

            <div className={`${style.inputStyle} mb-3`}>
              <div>
                <input
                  type="text"
                  placeholder="جست و جو"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              <div className={style.searchIconposition}>
                <Box
                  sx={{
                    width: 37,
                    height: 37,
                    display: "flex",
                    alignItems: "center",
                    padding: 1,
                    marginRight: "-15px",
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                      stroke="#333333"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22 22L20 20"
                      stroke="#333333"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Box>
              </div>
            </div>

            {/* Images on the top of the video */}
            <div className={style.fixLeftSideVideo}>
              {finalData.map((itemF) =>
                itemF?.info?.imgData?.map(
                  (item, index) =>
                    item.type === "1" ? (
                      <Card
                        key={index}
                        className={style.MainBOXCardStyle}
                        onClick={() =>
                          handleImageClick(
                            `${process.env.NEXT_PUBLIC_BACK_END_SERVER}/system/download/${item.src}`
                          )
                        }
                      >
                        <div className="d-flex flex-column gap-2 p-2">
                          <div className="position-relative">
                            <CardMedia
                              component="img"
                              src={`${process.env.NEXT_PUBLIC_BACK_END_SERVER}/system/download/${item.src}`}
                              alt={item.title}
                              sx={{
                                borderRadius: "4px",
                                height: "100%",
                              }}
                            />
                          </div>
                          {/* <CardContent className={`${style.resetPaddingMui}`}>
                            <div dir="rtl" className={`${style.titleStyle}`}>
                              <p className="VodeoDisSizing">{item.title}</p>
                              <span className="discription mt-1">
                                {item.description}
                              </span>
                            </div>
                          </CardContent> */}
                        </div>
                      </Card>
                    ) : null // Ensure it returns null if item.type !== 'img'
                )
              )}
            </div>

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
                        src={`${process.env.NEXT_PUBLIC_BACK_END_SERVER}/system/download/${currentVideo.src}`}
                        poster={`${process.env.NEXT_PUBLIC_BACK_END_SERVER}/system/download/${currentVideo.poster}`}
                        sx={{ borderRadius: "4px", maxHeight: "500px" }}
                        controls
                        ref={videoRef}
                      />
                      <CardContent>
                        <div className="d-flex flex-column">
                          <div className={`${style.titleStyle} purchesSize`}>
                            <span>
                              {currentVideo.title || "Untitled Video"}
                            </span>
                          </div>
                          <p className="VodeoDisSizing">
                            {currentVideo.description ||
                              "No description available."}
                          </p>
                        </div>
                      </CardContent>
                      {/* {!videoEnded && (
                        <>
                          <div className={style.BelowContentFixIcon}>
                            <svg
                              width={50}
                              height={49}
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
                      )} */}
                    </div>
                  </div>
                </Card>
              )}

              <div className={`${style.fixLeftSideVideo}`}>
                {finalData.map((itemF) =>
                  itemF?.media?.map((video, index) => (
                    <Card
                      key={index}
                      className={style.MainBOXCardStyle}
                      onClick={() => handleThumbnailClick(index)}
                    >
                      <div className="d-flex flex-column gap-2 p-2">
                        <div className="position-relative">
                          <CardMedia
                            component="img"
                            src={`${process.env.NEXT_PUBLIC_BACK_END_SERVER}/system/download/${video.poster}`}
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
                          {/* <div className={style.duration}>
                            {formatDuration(videoDurations[index])}
                          </div> */}
                        </div>
                        <CardContent className={`${style.resetPaddingMui}`}>
                          <div dir="rtl" className={`${style.titleStyle}`}>
                            <p className="VodeoDisSizing">{video.title}</p>
                            <span className="discription mt-1">
                              {video.description}
                            </span>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Bootstrap Modal for displaying image */}
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header
            closeButton
            className={style.ModalHeadStyle}
          ></Modal.Header>
          <Modal.Body className={`${style.modalBodyResetStyle} d-flex`}>
            <Box
              className={`${style.modalImgStyle} `}
              component="img"
              alt="image."
              src={selectedImage}
            />
          </Modal.Body>
        </Modal>
      </MainLayout>
    </>
  );
}
