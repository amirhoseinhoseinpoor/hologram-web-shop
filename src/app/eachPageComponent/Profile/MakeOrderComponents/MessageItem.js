// src/components/MessageItem.js

import React, { useState, useCallback } from "react";
import { Box } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Skeleton } from "@mui/material";
import { downloadImage } from "@/app/utils/downloadImage";
import style from "/src/app/Styles/Profile/MakeOrderStyle/Talkjs.module.scss";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const MessageItem = React.memo(
  ({
    msg,
    index,
    handleEditMessage,
    areYouShureFunction,
    dispatch,
    fetchPrivateImage,
    handleZoomFinalPattern,
  }) => {
    
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);
    const [loadingImage, setLoadingImage] = useState(false);

    const loadImage = useCallback(async () => {
      if (msg.imageUrl && !imageUrl) {
        setLoadingImage(true);
        try {
          const imageData = await dispatch(
            fetchPrivateImage({ filename: msg.imageUrl })
          ).unwrap();
          setImageUrl(imageData);
          setImageLoaded(true);
        } catch (error) {
          console.error("Failed to fetch image:", error);
        } finally {
          setLoadingImage(false);
        }
      }
    }, [msg.imageUrl, dispatch, fetchPrivateImage, imageUrl]);

    return (
      <div
        className={`${msg.isAdmin ? style.adminMessage : style.userMessage}`}
      >
        {msg.text && (
          <div className={style.allTextStyle}>
            <p className="discription">{msg.text}</p>
            <div
              className={`${
                msg.isAdmin ? style.adminDateStyle : style.userDateStyle
              } d-flex flex-row `}
            >
              <p className={`${style.TimeStyle} smallest`}>{msg.date}</p>
              {msg.isAdmin === false && (
                <div className="d-flex flex-row">
                  {/* Edit Icon */}
                  <svg
                    style={{ cursor: "pointer" }}
                    onClick={() => handleEditMessage(index)}
                    width={18}
                    height={17}
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.7599 3.59924L5.54985 12.2892C5.23985 12.6192 4.93985 13.2692 4.87985 13.7192L4.50985 16.9592C4.37985 18.1292 5.21985 18.9292 6.37985 18.7292L9.59985 18.1792C10.0499 18.0992 10.6799 17.7692 10.9899 17.4292L19.1999 8.73924C20.6199 7.23924 21.2599 5.52924 19.0499 3.43924C16.8499 1.36924 15.1799 2.09924 13.7599 3.59924Z"
                      stroke="#292D32"
                      strokeWidth="1.5"
                      strokeMiterlimit={10}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.3901 5.05078C12.8201 7.81078 15.0601 9.92078 17.8401 10.2008"
                      stroke="#292D32"
                      strokeWidth="1.5"
                      strokeMiterlimit={10}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3.5 22H21.5"
                      stroke="#292D32"
                      strokeWidth="1.5"
                      strokeMiterlimit={10}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  {/* Delete Icon */}
                  <svg
                    style={{ cursor: "pointer" }}
                    onClick={() => areYouShureFunction(index)}
                    width={18}
                    height={17}
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.5 5.98047C18.17 5.65047 14.82 5.48047 11.48 5.48047C9.5 5.48047 7.52 5.58047 5.54 5.78047L3.5 5.98047"
                      stroke="#292D32"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 4.97L9.22 3.66C9.38 2.71 9.5 2 11.19 2H13.81C15.5 2 15.63 2.75 15.78 3.67L16 4.97"
                      stroke="#292D32"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M19.3499 9.14062L18.6999 19.2106C18.5899 20.7806 18.4999 22.0006 15.7099 22.0006H9.2899C6.4999 22.0006 6.4099 20.7806 6.2999 19.2106L5.6499 9.14062"
                      stroke="#292D32"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.8301 16.5H14.1601"
                      stroke="#292D32"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 12.5H15"
                      stroke="#292D32"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>
        )}

        {msg.imageUrl && (
          <div className={style.allTextStyle}>
            {imageLoaded ? (
              <Box
                onClick={() => handleZoomFinalPattern(imageUrl)}
                className={`${style.imageChatStyle}`}
                component="img"
                src={imageUrl}
                alt="uploaded"
                style={{ cursor: "pointer", objectFit: "cover" }}
              />
            ) : loadingImage ? (
              <Skeleton
                className="mt-3 mb-3"
                animation="wave"
                variant="rounded"
                style={{ width: "31%" }}
                height={150}
              />
            ) : (
              <div
                className={style.imagePlaceholder}
                onClick={loadImage}
                style={{
                  width: "200px",
                  height: "130px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  backgroundColor: "#e0e0e0",
                  borderRadius: "8px",
                }}
              >
                <ArrowDownwardIcon />
              </div>
            )}

            {imageLoaded && (
              <div
                className={`${
                  msg.isAdmin ? style.adminDateStyle : style.userDateStyle
                } d-flex flex-row align-items-center justify-content-between`}
              >
                <p className={`${style.TimeStyle} smallest`}>{msg.date}</p>
                <div className="d-flex flex-row gap-2 align-items-center">
                  <p
                    style={{ cursor: "pointer" }}
                    onClick={() => downloadImage(imageUrl, `${new Date().toISOString()}.png`)}
                  >
                    <FileDownloadIcon />
                  </p>
                  {msg.isAdmin === false && (
                    <div className="d-flex flex-row">
                      <svg
                        style={{ cursor: "pointer" }}
                        onClick={() => areYouShureFunction(index)}
                        width={18}
                        height={17}
                        viewBox="0 0 25 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21.5 5.98047C18.17 5.65047 14.82 5.48047 11.48 5.48047C9.5 5.48047 7.52 5.58047 5.54 5.78047L3.5 5.98047"
                          stroke="#292D32"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9 4.97L9.22 3.66C9.38 2.71 9.5 2 11.19 2H13.81C15.5 2 15.63 2.75 15.78 3.67L16 4.97"
                          stroke="#292D32"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M19.3499 9.14062L18.6999 19.2106C18.5899 20.7806 18.4999 22.0006 15.7099 22.0006H9.2899C6.4999 22.0006 6.4099 20.7806 6.2999 19.2106L5.6499 9.14062"
                          stroke="#292D32"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10.8301 16.5H14.1601"
                          stroke="#292D32"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10 12.5H15"
                          stroke="#292D32"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

MessageItem.displayName = "MessageItem";
export default MessageItem;
