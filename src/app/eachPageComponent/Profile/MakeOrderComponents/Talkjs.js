"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import style from "/src/app/Styles/Profile/MakeOrderStyle/Talkjs.module.scss";
import { Box, Modal } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Skeleton } from "@mui/material";
import LoadingCss from "@/app/BaseComponent/LoadingCss";
import socket from "@/app/utils/socket";
// Import modals
import AreYouShureModal from "@/app/BaseComponent/AreYouSureModal";
import ZoomModal from "@/app/BaseComponent/ZoomModal";
// Import utils
import { downloadImage } from "@/app/utils/downloadImage";
// Import redux
import { useDispatch } from "react-redux";
import {
  sendNewMessage,
  uploadFile,
  fetchPrivateImage,
  chatImageSend,
  increaseStep,
} from "@/app/Store/thunks";

import MessageItem from "./MessageItem";

const ChatBox = ({
  handlePreviousStep,
  handleNextStep,
  chatData,
  code,
  step,
  data,
  chatImage: initialChatImage,
  setUpdateData,
}) => {
  const dispatch = useDispatch();

  // State variables
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
  const [convertedImage, setConvertedImage] = useState([]);
  const [loadingImageSend, setLoadingImageSend] = useState(false);
  const [loadingFinalPatConfirm, setLoadingFinalPatConfirm] = useState(false);

  // Modal states
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(null);
  const [finalPatternModal, setFinalPatternModal] = useState(false);
  const [sendingFinalPattern, setSendingFinalPattern] = useState([]);
  const [patternImageUrls, setPatternImageUrls] = useState({});

  // Close modal functions
  const closeModal = useCallback(() => setOpenModal(false), []);
  const closeModal2 = useCallback(() => setOpenModal2(null), []);
  const closeFinalPatternModal = useCallback(
    () => setFinalPatternModal(false),
    []
  );

  const handleZoomFinalPattern = useCallback((fileObj) => {
    setOpenModal2(fileObj);
  }, []);

  // Function to handle deletion confirmation
  const areYouShureFunction = useCallback((index) => {
    setMessageToDeleteIndex(index);
    setOpenModal(true);
  }, []);

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
      if (data.code === code && data.chatImage) {
        setChatImage(data.chatImage);
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
  }, [code, chatData, socket]);

  // Fetch user choice image when chatImage.userChoices changes
  useEffect(() => {
    const handleUserChoiceImage = async () => {
      if (chatImage?.userChoices && chatImage.userChoices.length > 0) {
        try {
          const imageData = await dispatch(
            fetchPrivateImage({ filename: chatImage.userChoices[0] })
          ).unwrap();
          setUserChoiseImage(imageData);
        } catch (error) {
          console.error("Failed to fetch image:", error);
        }
      }
    };

    handleUserChoiceImage();
  }, [chatImage, dispatch]);

  // Function to fetch image on demand and cache it
  const fetchImage = useCallback(
    async (filename) => {
      if (imageCache[filename]) {
        return imageCache[filename];
      }
      try {
        const imageData = await dispatch(
          fetchPrivateImage({ filename })
        ).unwrap();
        setImageCache((prevCache) => ({
          ...prevCache,
          [filename]: imageData,
        }));
        return imageData;
      } catch (error) {
        console.error("Failed to fetch image:", error);
        throw error;
      }
    },
    [dispatch, imageCache]
  );

  // Handle editing a message
  const handleEditMessage = useCallback(
    (index) => {
      setEditIndex(index);
      setIsEditing(true);
      setMessage(messages[index].text || "");
    },
    [messages]
  );

  // Cancel editing
  const cancelEdit = useCallback(() => {
    setEditIndex(null);
    setIsEditing(false);
    setMessage("");
  }, []);

  // Handle deleting a message
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

  // Send or edit a message
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
        isAdmin: false, // Set to false for site ChatBox
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
        // Assuming sendNewMessage action can be used to update the chat
        await dispatch(
          sendNewMessage({ code, newMessageSend: updatedMessages })
        );
      } catch (error) {
        console.error("Failed to update messages:", error);
        // Optionally handle the error (e.g., revert state, show notification)
      }
    },
    [dispatch, code]
  );

  // Scroll to bottom when messages are updated
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle image selection
  const handleSelectImage = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  }, []);

  // Cancel image sending
  const handleCancelSending = useCallback(() => {
    setImage(null);
    setSelectedImage(null);
  }, []);

  // Handle Final Pattern Modal
  const handleRemoveFinalPattern = useCallback((index) => {
    setSendingFinalPattern((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleSendingPattern = useCallback(() => {
    setFinalPatternModal(true);
  }, []);

  // Handle Final Pattern Upload
  const handleFileUpload = useCallback((event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files).map((file) => ({
        file,
        imageUrl: URL.createObjectURL(file),
      }));
      setSendingFinalPattern((prev) => [...prev, ...fileArray]);
    }
  }, []);

  const handleChatImageSendFunc = useCallback(async () => {
    try {
      setLoadingFinalPatConfirm(true);
      const fileIds = await Promise.all(
        sendingFinalPattern.map(async (item) => {
          if (typeof item === "object" && item.file) {
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
            console.warn("Unexpected item in SendingFinalPattern:", item);
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
        // Optionally, you can set a timeout to auto-close the modal
        setTimeout(() => setOpenModal2(null), 3000);
      } else {
        console.error("Failed to send images:", responseDispatchImage);
      }
    } catch (error) {
      console.error("Error sending chat images:", error);
    } finally {
      setLoadingFinalPatConfirm(false);
    }
  }, [sendingFinalPattern, dispatch, code]);

  // Handle user choice
  const handleUserChoice = useCallback(
    async (index) => {
      const finalUserChose = {
        ...chatImage,
        userChoices: [
          ...(chatImage.userChoices || []),
          chatImage?.images[index],
        ], // Append the new item
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
        setUpdateData(true);
        // handleNextStep();
      } catch (error) {
        console.error("Failed to dispatch user choice image:", error);
      } finally {
        setLoadingFinalPatConfirm(false);
      }
    },
    [dispatch, chatImage, code, setUpdateData]
  );

  return (
    <>
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
            <div
              className={`${style.chatContainer} container`}
              ref={chatBoxRef}
            >
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
                    fetchImage={fetchImage}
                    handleZoomFinalPattern={handleZoomFinalPattern} // Now does nothing
                  />
                ))}
            </div>
          </div>

          {/* User Choice Image Section */}
          {chatImage?.userChoices &&
            (userChoiseImage ? (
              <div className={`mt-3 ${style.confirmImage}`}>
                <div className="d-flex flex-row mb-2 mt-2 align-items-center">
                  <div>
                    <Box
                     
                      className={`${style.imageChatStyle}`}
                      component="img"
                      src={userChoiseImage}
                      onClick={() => handleZoomFinalPattern(userChoiseImage)}
                      style={{
                        width: "200px",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      alt="uploaded"
                      loading="lazy" // Native lazy loading
                    />
                  </div>
                  <div className="d-flex flex-column gap-3">
                    <p className="VodeoDisSizing me-2">طرح مورد تایید</p>
                    <p
                      onClick={() => {
                        const date = new Date();
                        downloadImage(
                          userChoiseImage,
                          `${date.toISOString()}.png`
                        );
                      }}
                      className={`me-2 text-center ${style.donsloadFinalUserStyle} NormalTextSizing`}
                    >
                      دانلود طرح
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className={`mt-3 ${style.confirmImage}`}>
                <div className="d-flex flex-row mb-2 mt-2 align-items-center">
                  <div
                    className={style.downloadButtonStyle}
                    onClick={() => {
                      // Handle user choice image logic
                      // Assuming you have a function to load user choice images
                      // If not, define it accordingly
                    }}
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

                  <div className="d-flex flex-column gap-3">
                    <p className="VodeoDisSizing me-2">طرح مورد تایید</p>
                    <p
                      onClick={() => {
                        const date = new Date();
                        downloadImage(
                          userChoiseImage,
                          `${date.toISOString()}.png`
                        );
                      }}
                      className={`me-2 text-center ${style.donsloadFinalUserStyle} NormalTextSizing`}
                    >
                      دانلود طرح
                    </p>
                  </div>
                </div>
              </div>
            ))}

          {/* Message Input Section */}
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
                      component="img"
                      src={selectedImage}
                      onClick={() => handleZoomFinalPattern(selectedImage)}
                      alt="uploaded"
                      className={style.selectedImageForSend}
                      loading="lazy" // Native lazy loading
                      style={{ cursor: "default", objectFit: "cover" }}
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

        {/* Navigation Buttons */}
        <div className="d-flex flex-row justify-content-between gap-2 mt-3 mb-4 container">
          <div className="d-flex flex-row gap-2">
            <button
              onClick={handleSendingPattern}
              className={style.continueButton}
            >
              ارسال طرح های نهایی
            </button>
            <button
              className={style.SeeLastStepButton}
              onClick={handlePreviousStep}
            >
              مرحله‌ی قبلی
            </button>
          </div>

          {moveForward && (
            <button
              type="button"
              onClick={handleNextStep}
              className={`${style.continueButton}`}
            >
              رد کردن
            </button>
          )}
        </div>

        {/* Final Pattern Modal */}
        {finalPatternModal && (
          <Modal
            open={finalPatternModal}
            onClose={closeFinalPatternModal}
            aria-labelledby="modal-modal-title2"
            aria-describedby="modal-modal-description2"
          >
            <div className={style.ModalPatternStyle}>
              <div className={style.sendingFinalPatternImage}>
                {sendingFinalPattern.length > 0 ? (
                  sendingFinalPattern.map((fileObj, index) => (
                    <div className="position-relative" key={index}>
                      <Box
                        className={`${style.imageChatStyle} mb-2 mt-2`}
                        component="img"
                        src={fileObj.imageUrl}
                        alt={`uploaded ${index}`}
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
                              patternImageUrls[fileObj] ||
                              fileObj.includes("data:image/png")
                            ) {
                              filename = "finalPayment.png";
                            } else if (
                              patternImageUrls[fileObj] ||
                              fileObj.includes("data:image/svg+xml")
                            ) {
                              filename = "finalPayment.svg";
                            }

                            link.href = patternImageUrls[fileObj] || fileObj;
                            link.download = filename;
                            link.click();
                          } else {
                            if (fileObj?.imageUrl.includes("data:image/png")) {
                              filename = "finalPayment.png";
                            } else if (
                              fileObj?.imageUrl.includes("data:image/svg+xml")
                            ) {
                              filename = "finalPayment.svg";
                            }

                            link.href = fileObj?.imageUrl;
                            link.download = filename;
                            link.click();
                          }
                        }}
                      >
                        <FileDownloadIcon style={{ color: "white" }} />
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="discription text-center mt-4 mb-4">
                    هنوز طرحی اضافه نکرده اید
                  </p>
                )}
              </div>

              {/* File Upload Section */}
              <div className="d-flex flex-row justify-content-between mt-3 mb-3">
                <div className="me-2">
                  <label
                    htmlFor="fileFinalPattern"
                    className={style.LabelFileUploadPattern}
                  >
                    <p
                      className={`${style.addAnotherPattern} oneBeforeSmallest`}
                    >
                      اضافه کردن طرح
                    </p>
                  </label>
                  <input
                    onChange={handleFileUpload}
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    className={`d-none`}
                    id="fileFinalPattern"
                    multiple // Allow multiple file uploads if needed
                  />
                </div>
                {sendingFinalPattern.length > 0 && (
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

        {/* Success Confirmation Modal */}
        <ZoomModal
          open={openModal2}
          onClose={closeModal2}
          src={openModal2}
          alt={`zoomModalImage`}
        />

        {/* Delete Confirmation Modal */}
        <AreYouShureModal
          open={openModal}
          onClose={closeModal}
          text={"ایا از حذف پیام مطمئن هستید ؟"}
          func={() => handleDeleteMessage(messageToDeleteIndex)}
        />
      </div>
    </>
  );
};

export default React.memo(ChatBox);
