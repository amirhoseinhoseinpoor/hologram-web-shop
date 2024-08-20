"use client";

import React, { useRef, useEffect, useState } from "react";
import style from "../../Styles/ProductPage/innerProductPage/DynamicProductShow.module.scss";
import { Card, CardMedia, Box } from "@mui/material";
import Link from "next/link";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

export default function ProductShow({ data }) {
  // State to track the currently selected media (image or video)
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  //color and size part
  const [colors, setColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  // Function to handle the click event on thumbnails
  const handleThumbnailClick = (index) => {
    setCurrentMediaIndex(index);
  };

  return (
    <div className="container">
      <div className={`${style.fixMainPlace} d-flex flex-row mt-3 gap-3`}>
        <div className={`${style.fixMainSizeRight} d-flex flex-column`}>
          <div>
            <Card className="position-relative">
              {data[0].imgData[currentMediaIndex].type === "video" ? (
                <CardMedia
                  component="video"
                  src={data[0].imgData[currentMediaIndex].src}
                  // poster={data[currentMediaIndex].poster}
                  sx={{ borderRadius: "4px" }}
                  controls
                  // ref={videoRef}
                />
              ) : (
                <CardMedia
                  component="img"
                  src={data[0].imgData[currentMediaIndex].src}
                  sx={{ borderRadius: "4px" }}
                  style={{maxHeight : "395px"}}
                />
              )}

              {/* {!videoEnded && (
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
          )} */}
            </Card>
          </div>

          <div className={`position-relative d-flex justify-content-center`}>
            <div className={`${style.innerStyleDivForMain}`}>
              <Swiper
                loop={true}
                slidesPerView={4}
                navigation={{
                  nextEl: ".review-swiper-button-next2",
                  prevEl: ".review-swiper-button-prev2",
                }}
                modules={[Navigation]}
                className={`${style.swiperWrapergap} mySwiper`}
              >
                <div className="d-flex mt-2">
                  {data[0].imgData.map((media, index) => (
                    <SwiperSlide
                      key={index}
                      className={`d-flex flex-column`}
                    >
                      <div
                        onClick={() => handleThumbnailClick(index)}
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        {media.type === "video" ? (
                          <div className="position-relative">
                            <Box
                              className={style.fixStyleSizeImgRe}
                              component="img"
                              // sx={{
                              //   width: "100px",
                              //   height: "80px",
                              //   borderRadius: "5px",
                              // }}
                              src={media.poster}
                            />

                            <div className={`${style.posterIcon}`}>
                              <svg
                                width={25}
                                height={24}
                                viewBox="0 0 25 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M4.5 12.0004V8.44038C4.5 4.02038 7.63 2.21038 11.46 4.42038L14.55 6.20038L17.64 7.98038C21.47 10.1904 21.47 13.8104 17.64 16.0204L14.55 17.8004L11.46 19.5804C7.63 21.7904 4.5 19.9804 4.5 15.5604V12.0004Z"
                                  stroke="#333333"
                                  strokeWidth="1.5"
                                  strokeMiterlimit={10}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                        ) : (
                          <Box
                          className={style.fixStyleSizeImgRe}
                          component="img"
                          src={media.src}
                          alt={`Thumbnail ${index}`}
                          />
                        )}
                      </div>
                    </SwiperSlide>
                  ))}
                </div>
              </Swiper>
              <div className={style.buttonNextStyle}>
                <button
                  aria-label="Play video"
                  className="review-swiper-button-prev2"
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
                  className="review-swiper-button-next2"
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
        </div>
        <div className={`${style.fixMainSizeleft} d-flex flex-column`}>
          <div className="d-flex flex-row gap-3">
            <div>
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.5 10.6504H9.5"
                  stroke="#333333"
                  strokeWidth="1.5"
                  strokeMiterlimit={10}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16.8203 2H7.18031C5.05031 2 3.32031 3.74 3.32031 5.86V19.95C3.32031 21.75 4.61031 22.51 6.19031 21.64L11.0703 18.93C11.5903 18.64 12.4303 18.64 12.9403 18.93L17.8203 21.64C19.4003 22.52 20.6903 21.76 20.6903 19.95V5.86C20.6803 3.74 18.9503 2 16.8203 2Z"
                  stroke="#333333"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <svg
                width={16}
                height={18}
                viewBox="0 0 16 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.68 9.00016C10.68 7.81016 11.65 6.84016 12.84 6.84016C14.03 6.84016 15 7.81016 15 9.00016C15 10.1902 14.03 11.1602 12.84 11.1602C11.65 11.1602 10.68 10.1902 10.68 9.00016Z"
                  stroke="#333333"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1.00031 14.2101C1.00031 13.0201 1.97031 12.0501 3.16031 12.0501C4.35031 12.0501 5.32031 13.0201 5.32031 14.2101C5.32031 15.4001 4.35031 16.3701 3.16031 16.3701C1.97031 16.3701 1.00031 15.4101 1.00031 14.2101Z"
                  stroke="#333333"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1.00031 3.7902C1.00031 2.6002 1.97031 1.63019 3.16031 1.63019C4.35031 1.63019 5.32031 2.6002 5.32031 3.7902C5.32031 4.9802 4.35031 5.9502 3.16031 5.9502C1.97031 5.9502 1.00031 4.9802 1.00031 3.7902Z"
                  stroke="#333333"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4.99966 5.00032L8.56499 7.23448L10.3477 8.35156"
                  stroke="#333333"
                  strokeWidth="1.5"
                  strokeMiterlimit={10}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5.73883 13.349L10.8637 10.1374L10.8649 10.1399"
                  stroke="#333333"
                  strokeWidth="1.5"
                  strokeMiterlimit={10}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <div className="mt-2">
            <p className="title">{data[0].title}</p>
          </div>
          <div className="mt-3">
            <p>{data[0].subtitle}</p>
          </div>
          <div className="mt-3">
            <div>
              <span className="ms-2">رنگ:</span>
              <span>{selectedColor}</span>
            </div>
            <div className="d-flex flex-row gap-2 mt-2">
              {data[0].color.map((item, index) => (
                <React.Fragment key={index}>
                  <div
                    className={style.coloredBoxStyle}
                    style={{
                      backgroundColor: item.value,
                      border:
                        selectedColor === item.value ? "3px solid #404756" : "",

                      boxShadow:
                        selectedColor === item.value
                          ? "0 0 5px rgba(0, 0, 0, 0.2)"
                          : "none",
                    }}
                    onClick={() => handleColorChange(item.value)}
                  ></div>
                </React.Fragment>
              ))}
            </div>
            <h3 className="mb-3 mt-3">سایز</h3>
            <div style={{ display: "flex", gap: "10px" }}>
              {data[0].sizes.map((size, index) => (
                <div
                  className={style.SizezInput}
                  key={index}
                  style={{
                    border: selectedSize === size ? "1.5px solid #404756" : "",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleSizeChange(size)}
                >
                  {size}
                </div>
              ))}
            </div>
            <div className={`${style.resetJustifyInresponsiveFix} mt-4 d-flex flex-row justify-content-around`}>
              <div className={style.justAddMarginRespon}>
                <Link href={`/Profile?type=makeOrder`} passHref>
                <button
                  className={style.addProductPage}
                  type="button"
                >
                  <div className="d-flex flex-row justify-content-center align-items-center gap-2">
                    <div>خرید محصول</div>
                    <svg
                      width={20}
                      height={20}
                      viewBox="0 0 25 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.07 6.42969L4 12.4997L10.07 18.5697"
                        stroke="white"
                        strokeWidth={2}
                        strokeMiterlimit={10}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M20.9999 12.5H4.16992"
                        stroke="white"
                        strokeWidth={2}
                        strokeMiterlimit={10}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </button>
                </Link>
              </div>
              <div>
                <button className={style.buttonCanceler}>
                  نیاز به مشاوره دارید؟
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
