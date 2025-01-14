// src/components/ChatBox.js

"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import style from "/src/app/Styles/Profile/MakeOrderStyle/Talkjs.module.scss";
import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import { useDispatch } from "react-redux";
import {
  sendNewMessage,
  chatImageSend,
  uploadFile,
  fetchPrivateImage,
  increaseStep,
} from "@/app/Store/thunks";
import AreYouShureModal from "@/app/BaseComponent/AreYouSureModal";
import ConfirmingModal from "@/app/BaseComponent/ConfirmingModal";
import ZoomModal from "@/app/BaseComponent/ZoomModal";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Skeleton } from "@mui/material";
import LoadingCss from "@/app/BaseComponent/LoadingCss";
import socket from "@/app/utils/socket";
// import utils
import { downloadImage } from "@/app/utils/downloadImage";
import MessageItem from "./MessageItem"; // Import the MessageItem component

const ModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "1.5px solid #000",
  boxShadow: 24,
  p: 0,
};

const ChatBox = ({
  handlePreviousStep,
  handleNextStep,
  chatData,
  code,
  step,
  data,
  chatImage: initialChatImage,
  setUpdateData,
  setNavStep
}) => {
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatImage, setChatImage] = useState(
    initialChatImage || { images: [], userChoices: [] }
  );
  const [image, setImage] = useState(null);
  const chatBoxRef = useRef(null); // Ref to access the chat container
  const [editIndex, setEditIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageCache, setImageCache] = useState({});
  const [messageToDeleteIndex, setMessageToDeleteIndex] = useState(null);
  const [moveForward, setMoveForward] = useState(false);
  const [userChoiseImage, setUserChoiseImage] = useState(null);
  const [ConvertedImage, setConvertedImage] = useState([]);
  const [loadingImageSend, setLoadingImageSend] = useState(false);
  const [loadingFinalPatConfirm, setLoadingFinalPatConfirm] = useState(false);

  // Modal states
  const [FinalPaternModal, setFinalPaternModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);
  const [zoomImageSrc, setZoomImageSrc] = useState(null);

  // Close modal functions
  const closeModal = useCallback(() => setOpenModal(false), []);
  const closeModal2 = useCallback(() => setOpenModal2(false), []);
  const closeFinalPaternModal = useCallback(() => setFinalPaternModal(false), []);
  const closeZoomModal = useCallback(() => {
    setIsZoomModalOpen(false);
    setZoomImageSrc(null);
  }, []);

  // Function to close modal2 after a timeout
  const closeModalOnTimeout = useCallback(() => {
    setTimeout(() => {
      setOpenModal2(false);
    }, 3000);
  }, []);

  const handleZoomFinalPattern = useCallback((imageSrc) => {
    setZoomImageSrc(imageSrc);
    setIsZoomModalOpen(true);
  }, []);

  const areYouShureFunction = useCallback((index) => {
    setMessageToDeleteIndex(index);
    setOpenModal(true);
  }, []);

  useEffect(() => {
    if (step > 3) {
      setMoveForward(true);
    }
  }, [step]);


  // Initialize socket connection
  useEffect(() => {
    if (!socket) {
      console.error("Socket not initialized.");
      return;
    }

    socket.emit("joinRoom", { code });

    setMessages(Array.isArray(chatData) ? chatData : []);

    // Listen for chat updates
    socket.on("message", (data) => {
      if (data.code === code) {
        setMessages(Array.isArray(data.chat) ? data.chat : []);
      }
      if (data.chatImage) {
        setChatImage(data.chatImage);
      }
    });

    socket.on("chatImageUpdate", (data) => {
      if (data.code === code) {
        if (data.chatImage) {
          setChatImage(data.chatImage);
        }
      }
    });

    // Handle connection errors
    socket.on("connect_error", (err) => {
      console.error("Chat Socket Connection Error:", err.message);
    });

    // Clean up the listener on unmount
    return () => {
      socket.off("message");
      socket.off("chatImageUpdate");
      socket.emit("leaveRoom", { code });
    };
  }, [code, chatData]);

  // Fetch images when chatImage changes
  useEffect(() => {
    if (chatImage && chatImage.images) {
      // Fetch each image one by one
      const fetchImages = async () => {
        const allImages = [];

        for (const filename of chatImage.images) {
          if (!imageCache[filename]) {
            try {
              const imageData = await dispatch(
                fetchPrivateImage({ filename })
              ).unwrap();
              allImages.push(imageData); // Accumulate each image data in the array
              setImageCache((prevCache) => ({
                ...prevCache,
                [filename]: imageData,
              }));
            } catch (error) {
              console.error("Failed to fetch image:", error);
            }
          } else {
            allImages.push(imageCache[filename]);
          }
        }

        if (chatImage?.userChoices && chatImage.userChoices.length > 0) {
          const userChoiceFilename = chatImage.userChoices[0];
          if (!imageCache[userChoiceFilename]) {
            try {
              const imageData = await dispatch(
                fetchPrivateImage({ filename: userChoiceFilename })
              ).unwrap();
              setUserChoiseImage(imageData);
              setImageCache((prevCache) => ({
                ...prevCache,
                [userChoiceFilename]: imageData,
              }));
            } catch (error) {
              console.error("Failed to fetch user choice image:", error);
            }
          } else {
            setUserChoiseImage(imageCache[userChoiceFilename]);
          }
        }

        setConvertedImage((prevCache) => ({
          ...prevCache,
          allImages,
        }));
      };

      fetchImages(); // Call the async function
    }
  }, [chatImage, dispatch, imageCache]);

  const handleEditMessage = useCallback(
    (index) => {
      setEditIndex(index);
      setIsEditing(true);
      setMessage(messages[index].text || "");
    },
    [messages]
  );

  const cancelEdit = useCallback(() => {
    setEditIndex(null);
    setIsEditing(false);
    setMessage("");
  }, []);

  const handleDeleteMessage = useCallback(
    (index) => {
      const updatedMessages = messages.filter((_, i) => i !== index);
      setMessages(updatedMessages);
      updateMessagesOnServer(updatedMessages);
      setOpenModal(false);
      setMessageToDeleteIndex(null);
    },
    [messages]
  );

  const sendMessage = useCallback(async () => {
    if (!message.trim() && !image) return; // Prevent sending empty messages

    if (isEditing) {
      // Editing an existing message
      const updatedMessages = messages.map((msg, i) =>
        i === editIndex ? { ...msg, text: message.trim() } : msg
      );
      setMessages(updatedMessages);
      setEditIndex(null);
      setIsEditing(false);
      setMessage("");
      updateMessagesOnServer(updatedMessages);
    } else {
      // Sending a new message
      const newMessageObject = {
        isAdmin: false,
        date: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      if (message.trim()) {
        newMessageObject.text = message.trim();
      }

      if (image) {
        try {
          setLoadingImageSend(true);
          const tag = "chatBoxImage";
          const type = 1; // Adjust based on your backend logic
          const isPublic = false;

          const response = await dispatch(
            uploadFile({ file: image, tag, type, isPublic })
          ).unwrap();

          newMessageObject.imageUrl = response; // filename returned from thunk
        } catch (error) {
          console.error("Image upload failed:", error);
          return;
        } finally {
          setLoadingImageSend(false);
        }
      }

      const updatedMessages = [...messages, newMessageObject];
      setMessages(updatedMessages);

      updateMessagesOnServer(updatedMessages);

      setMessage("");
      setImage(null);
      setSelectedImage(null);
    }
  }, [message, image, isEditing, editIndex, messages, dispatch]);

  // Function to update messages on the server
  const updateMessagesOnServer = useCallback(
    async (updatedMessages) => {
      try {
        await dispatch(
          sendNewMessage({ code, newMessageSend: updatedMessages })
        );
      } catch (error) {
        console.error("Failed to update messages:", error);
      }
    },
    [dispatch, code]
  );

  const handleUserChoice = async (index) => {
    const finalUserChose = {
      ...chatImage,
      userChoices: [...(chatImage.userChoices || []), chatImage?.images[index]], // Append the new item
    };

    // Dispatch the new object with the appended user choices
    const fetchUserChoiceImage = dispatch(
      chatImageSend({ code, chatImage: finalUserChose })
    );

    const increseingStep = dispatch(increaseStep({ code, step: 4 }));

    try {
      setLoadingFinalPatConfirm(true);
      await fetchUserChoiceImage;
      await increseingStep;
      setNavStep(4);
      handleNextStep();
    } catch (error) {
      console.error("Failed to dispatch user choice image:", error);
    } finally {
      setLoadingFinalPatConfirm(false);
    }
  };

  // Scroll to bottom when messages are updated
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSelectImage = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  }, []);

  const handleCancelSending = useCallback(() => {
    setImage(null);
    setSelectedImage(null);
  }, []);

  const handleRemoveFinalPattern = useCallback(
    (index) => {
      setConvertedImage((prev) => ({
        ...prev,
        allImages: prev.allImages.filter((_, i) => i !== index),
      }));
      setFinalPaternModal((prev) => ({
        ...prev,
        allImages: prev.allImages.filter((_, i) => i !== index),
      }));
    },
    []
  );

  const handleChatImageSendFunc = useCallback(async () => {
    try {
      setLoadingFinalPatConfirm(true);
      const fileIds = await Promise.all(
        ConvertedImage.allImages.map(async (item) => {
          if (item && item.file) {
            const tag = "chatBoxImage";
            const type = 1;
            const isPublic = false;
            const file = item.file;

            const fileIdSrc = await dispatch(
              uploadFile({ file, tag, type, isPublic })
            ).unwrap();
            return fileIdSrc; // filename returned from thunk
          } else if (typeof item === "string") {
            return item;
          } else {
            console.warn("Unexpected item in ConvertedImage:", item);
            return null;
          }
        })
      );

      const validFileIds = fileIds.filter((id) => id !== null);

      const responseDispatchImage = await dispatch(
        chatImageSend({
          code,
          chatImage: { images: validFileIds },
        })
      ).unwrap();

      if (responseDispatchImage?.statusCode === 200) {
        setOpenModal2(true);
        closeModalOnTimeout();
      } else {
        console.error("Failed to send images:", responseDispatchImage);
      }
    } catch (error) {
      console.error("Error sending chat images:", error);
    } finally {
      setLoadingFinalPatConfirm(false);
    }
  }, [ConvertedImage.allImages, dispatch, code, closeModalOnTimeout]);

  return (
    <div className="container">
      <div className={`${style.stepContent}`}>
        <div className={style.mainChatBox}>
          <div
            className={`${style.headerChatBox} d-flex flex-row justify-content-between`}
          >
            <div>
              <p className="discription">
                {data?.prodName ? data.prodName : "محصول پایه"}
              </p>
            </div>
            <div className="discription">{code}</div>
          </div>

          {/* Scrollable chat area */}
          <div className={`${style.chatContainer} container`} ref={chatBoxRef}>
            {messages.length === 0 && (
              <p
                style={{ marginTop: "60px", marginBottom: "60px" }}
                className="discription text-center"
              >
                در حال حاضر پیامی وجود ندارد پیام خود را ارسال کنید
              </p>
            )}
            {Array.isArray(messages) &&
              messages.map((msg, index) => (
                <MessageItem
                  key={index}
                  msg={msg}
                  index={index}
                  handleEditMessage={handleEditMessage}
                  areYouShureFunction={areYouShureFunction}
                  dispatch={dispatch}
                  fetchPrivateImage={fetchPrivateImage}
                  handleZoomFinalPattern={handleZoomFinalPattern}
                />
              ))}
          </div>
        </div>

        {chatImage?.images?.length > 0 && (
          <div className={`mt-3 ${style.confirmImage}`}>
            {userChoiseImage ? (
              <div className="d-flex flex-row mb-2 mt-2 align-items-center">
                <div>
                  <Box
                    onClick={() => handleZoomFinalPattern(userChoiseImage)}
                    className={`${style.imageChatStyle}`}
                    component="img"
                    src={userChoiseImage}
                    style={{
                      width: "200px",
                      height: "100%",
                      cursor: "pointer",
                      objectFit: "cover",
                    }}
                    alt="uploaded"
                  />
                </div>
                <div className="d-flex flex-column gap-3">
                  <p className="VodeoDisSizing me-2">طرح مورد تایید</p>
                  <p
                    onClick={() => {
                      const date = new Date();
                      downloadImage(userChoiseImage, `${date.toISOString()}.png`);
                    }}
                    className={`me-2 text-center ${style.donsloadFinalUserStyle} NormalTextSizing`}
                  >
                    دانلود طرح
                  </p>
                </div>
              </div>
            ) : (
              <div className={`d-flex flex-column mb-2 text-center mt-2 `}>
                {ConvertedImage?.allImages?.length === 0 ? (
                  <div
                    className={style.downloadButtonStyle}
                    onClick={() => setFinalPaternModal(true)}
                  >
                    <Skeleton
                      className="mt-3 mb-3"
                      variant="rounded"
                      style={{ width: "200px" }}
                      height={130}
                    />
                    <div className={style.insideButtonDownload}>
                      <ArrowDownwardIcon />
                    </div>
                  </div>
                ) : (
                  ConvertedImage?.allImages?.map((item, index) => (
                    <div className="d-flex flex-row mb-2 mt-2" key={index}>
                      <div>
                        <Box
                          onClick={() => handleZoomFinalPattern(item)}
                          className={`${style.imageChatStyle}`}
                          component="img"
                          src={item}
                          style={{
                            width: "100px",
                            height: "100%",
                            cursor: "pointer",
                            objectFit: "cover",
                          }}
                          alt="uploaded"
                        />
                      </div>
                      <div className="d-flex flex-column justify-content-center">
                        <div className="me-2">
                          <p className="smallest">
                            آیا طرح نهایی مورد تایید شماست؟
                          </p>
                        </div>
                        <div className={`d-flex flex-row gap-2 mt-1 me-1`}>
                          <button
                            disabled={loadingFinalPatConfirm}
                            onClick={() => handleUserChoice(index)}
                            style={{
                              cursor: "pointer",
                              backgroundColor: loadingFinalPatConfirm
                                ? "#5F5F5F"
                                : "",
                            }}
                            className={`${style.confirmFirstButton} smallest`}
                          >
                            بله، مورد تایید است
                          </button>
                          <button
                            className={`${style.confirmSecondButton} smallest`}
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              const date = new Date();
                              downloadImage(item, `${date.toISOString()}.png`);
                            }}
                          >
                            دانلود طرح
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}

        <div className="position-relative mt-3 d-flex">
          {selectedImage ? (
            <div
              className={`${style.mainDivSelectedImage} d-flex flex-row align-items-center justify-content-between w-100`}
            >
              {loadingImageSend ? (
                <div className="w-100 justify-content-center p-3 d-flex">
                  <LoadingCss />
                </div>
              ) : (
                <>
                  <Box
                    onClick={() => handleZoomFinalPattern(selectedImage)}
                    component="img"
                    src={selectedImage}
                    alt="uploaded"
                    className={style.selectedImageForSend}
                    style={{
                      cursor: "pointer",
                      objectFit: "cover",
                      width: "100px",
                      height: "100px",
                    }}
                  ></Box>
                  <div className="d-flex flex-column gap-2 ms-3">
                    <button
                      onClick={sendMessage}
                      disabled={loadingImageSend}
                      className={`${style.sendMessageChatBox} ${
                        loadingImageSend ? style.disableInputStyleImage : ""
                      } smallest`}
                    >
                      ارسال
                    </button>
                    <button
                      onClick={handleCancelSending}
                      className={`${style.cancelSendingImage} smallest`}
                    >
                      لغو
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="d-flex flex-row w-100">
              <textarea
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="پیام خود را بنویسید"
                className={`${style.inputChatBoxStyle} discription`}
              />
              {message.length === 0 && (
                <>
                  <label
                    htmlFor="fileInputChatBox"
                    className={`${style.LabelFileUpload} ${
                      loadingImageSend ? style.disableInputStyleImage : ""
                    }`}
                  >
                    <svg
                      width={27}
                      height={27}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.5 7.5H15.7924C18.3773 7.5 20.5 9.52091 20.5 12C20.5 14.4709 18.3859 16.5 15.7924 16.5H14.5"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9.5 16.5H8.21429C5.61714 16.5 3.5 14.4791 3.5 12C3.5 9.52909 5.61714 7.5 8.21429 7.5H9.5"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.5 12H15.5"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </label>
                  <input
                    disabled={loadingImageSend}
                    type="file"
                    onChange={handleSelectImage}
                    accept="image/*"
                    className={`d-none`}
                    id="fileInputChatBox"
                  />
                </>
              )}

              {message.length > 0 && (
                <button
                  onClick={sendMessage}
                  className={`${style.sendMessageChatBox2} smallest`}
                >
                  ارسال
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="d-flex flex-row gap-2 mt-3">
        <button
          className={style.SeeLastStepButton}
          onClick={handlePreviousStep}
        >
          مرحله‌ی قبلی
        </button>
        {moveForward && (
          <button
            type="button"
            onClick={handleNextStep}
            className={`${style.continueButton}`}
          >
           مرحله بعدی
          </button>
        )}
      </div>

      {/* Final Pattern Modal */}
      {FinalPaternModal && (
        <Modal
          open={FinalPaternModal}
          onClose={closeFinalPaternModal}
          aria-labelledby="modal-modal-title2"
          aria-describedby="modal-modal-description2"
        >
          <div style={ModalStyle} className={style.ModalPatternStyle}>
            <div className={style.sendingFinalPatternImage}>
              {ConvertedImage.allImages.map((fileObj, index) => (
                <div className="position-relative" key={index}>
                  <Box
                    className={`${style.imageChatStyle} mb-2 mt-2`}
                    component="img"
                    src={fileObj}
                    alt={`uploaded ${index}`}
                    onClick={() => handleZoomFinalPattern(fileObj)}
                    style={{
                      cursor: "pointer",
                      objectFit: "cover",
                      width: "100px",
                      height: "100px",
                    }}
                  />
                  <div
                    style={{ cursor: "pointer" }}
                    className={style.deleteIconStyle}
                    onClick={() => handleRemoveFinalPattern(index)}
                  >
                    {/* Delete SVG */}
                    <svg
                      width={17}
                      height={17}
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.5 2.98828C8.835 2.82328 7.16 2.73828 5.49 2.73828C4.5 2.73828 3.51 2.78828 2.52 2.88828L1.5 2.98828"
                        stroke="#FF4F3F"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M4.25 2.485L4.36 1.83C4.44 1.355 4.5 1 5.345 1H6.655C7.5 1 7.565 1.375 7.64 1.835L7.75 2.485"
                        stroke="#FF4F3F"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9.4252 4.57031L9.1002 9.60531C9.0452 10.3903 9.0002 11.0003 7.6052 11.0003H4.3952C3.0002 11.0003 2.9552 10.3903 2.9002 9.60531L2.5752 4.57031"
                        stroke="#FF4F3F"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5.16504 8.25H6.83004"
                        stroke="#FF4F3F"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M4.75 6.25H7.25"
                        stroke="#FF4F3F"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <p
                    className={style.downloadImageFinalP}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      const link = document.createElement("a");

                      let filename = "finalPayment.png";

                      if (typeof fileObj === "string") {
                        if (
                          fileObj.includes("data:image/png") ||
                          fileObj.includes("data:image/jpeg")
                        ) {
                          filename = "finalPayment.png";
                        } else if (
                          fileObj.includes("data:image/svg+xml")
                        ) {
                          filename = "finalPayment.svg";
                        }

                        link.href = fileObj;
                        link.download = filename;
                        link.click();
                      } else {
                        if (fileObj.includes("data:image/png")) {
                          filename = "finalPayment.png";
                        } else if (fileObj.includes("data:image/svg+xml")) {
                          filename = "finalPayment.svg";
                        }

                        link.href = fileObj;
                        link.download = filename;
                        link.click();
                      }
                    }}
                  >
                    <FileDownloadIcon style={{ color: "white" }} />
                  </p>
                </div>
              ))}
            </div>

            {ConvertedImage.allImages.length === 0 && (
              <p className="discription text-center mt-4 mb-4">
                هنوز طرحی اضافه نکرده اید
              </p>
            )}

            <div className="d-flex flex-row justify-content-between mt-3 mb-3">
              <div className="me-2">
                <label
                  htmlFor="fileFinalPattern"
                  className={style.LabelFileUploadPattern}
                >
                  <p className={`${style.addAnotherPattern} oneBeforeSmallest`}>
                    اضافه کردن طرح
                  </p>
                </label>
                <input
                  onChange={(event) => {
                    const files = event.target.files;
                    if (files && files.length > 0) {
                      const fileArray = Array.from(files).map((file) => ({
                        file,
                        imageUrl: URL.createObjectURL(file),
                      }));
                      setConvertedImage((prev) => ({
                        ...prev,
                        allImages: [...prev.allImages, ...fileArray.map((f) => f.imageUrl)],
                      }));
                    }
                  }}
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  className={`d-none`}
                  id="fileFinalPattern"
                  multiple
                />
              </div>
              {ConvertedImage.allImages.length > 0 && (
                <div className="ms-2">
                  <button
                    disabled={loadingFinalPatConfirm}
                    onClick={handleChatImageSendFunc}
                    className={style.confirmpatternButtonStyle}
                  >
                    {loadingFinalPatConfirm ? <LoadingCss /> : "تایید نهایی"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}

      {/* Confirming Modal */}
      <ConfirmingModal
        open={openModal2}
        onClose={closeModal2}
        text={"طرح با موفقیت ثبت شد"}
      />

      {/* Are You Sure Modal */}
      <AreYouShureModal
        open={openModal}
        onClose={closeModal}
        text={"ایا از حذف پیام مطمئن هستید ؟"}
        func={() => handleDeleteMessage(messageToDeleteIndex)}
      />

      {/* Zoom Modal */}
      <ZoomModal
        open={isZoomModalOpen}
        onClose={closeZoomModal}
        src={zoomImageSrc}
        alt={`zoomModalImage`}
      />
    </div>
  );
};

export default React.memo(ChatBox);
