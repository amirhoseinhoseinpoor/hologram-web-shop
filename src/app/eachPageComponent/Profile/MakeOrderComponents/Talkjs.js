"use client";

import { useState, useEffect, useRef } from "react";
import style from "/src/app/Styles/Profile/MakeOrderStyle/Talkjs.module.scss";
import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import socket from "@/app/utils/socket";
// import modals
import AreYouShureModal from "@/app/BaseComponent/AreYouSureModal";
import ZoomModal from "@/app/BaseComponent/ZoomModal";

// import redux
import { useDispatch } from "react-redux";
import {
  sendNewMessage,
  uploadFile,
  fetchPrivateImage,
  chatImageSend,
  increaseStep,
} from "@/app/Store/thunks";

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
  chatImage,
}) => {
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
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
  console.log(ConvertedImage);

  // modal state
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(null);

  // Close modal
  const closeModal = () => setOpenModal(false);
  const closeModal2 = () => setOpenModal2(null);

  const handleZoomFinalPattern = (fileObj) => {
    setOpenModal2(fileObj);
  };

  // modal part state and function
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const areYouShureFunction = (index) => {
    setMessageToDeleteIndex(index);
    setOpenModal(true);
  };

  // Initialize socket connection
  useEffect(() => {
    setMessages(Array.isArray(chatData) ? chatData : []);

    // Listen for chat updates
    socket.on("chatUpdate", (data) => {
      if (data.code === code) {
        setMessages(Array.isArray(data.chat) ? data.chat : []);
      }
    });

    // // Clean up the listener on unmount
    // return () => {
    //   socket.disconnect();
    // };
  }, [code, chatData]);

  useEffect(() => {
    if (chatImage && chatImage.images) {
      // Fetch each image one by one
      const fetchImages = async () => {
        const allImages = []; // This will hold all fetched image data

        for (const filename of chatImage.images) {
          try {
            const imageData = await dispatch(
              fetchPrivateImage({ filename })
            ).unwrap();
            allImages.push(imageData); // Accumulate each image data in the array
          } catch (error) {
            console.error("Failed to fetch image:", error);
          }
        }

        if (chatImage?.userChoices) {
          try {
            const imageData = await dispatch(
              fetchPrivateImage({ filename: chatImage?.userChoices[0] })
            ).unwrap();
            setUserChoiseImage(imageData);
          } catch (error) {
            console.error("Failed to fetch image:", error);
          }
        }

        // After all images are fetched, update the state once
        setConvertedImage((prevCache) => ({
          ...prevCache,
          allImages, // Append all new images to the existing ones
        }));
      };

      fetchImages(); // Call the async function
    }
  }, [chatImage]);

  const handleEditMessage = (index) => {
    setEditIndex(index);
    setIsEditing(true);
    setMessage(messages[index].text || "");
  };

  const cancelEdit = () => {
    setEditIndex(null);
    setIsEditing(false);
    setMessage("");
  };

  const handleDeleteMessage = (index) => {
    const updatedMessages = messages.filter((_, i) => i !== index);
    setMessages(updatedMessages);
    updateMessagesOnServer(updatedMessages);
    setOpenModal(false);
    setMessageToDeleteIndex(null);
  };

  const sendMessage = async () => {
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
          const tag = "chatBoxImage";
          const type = 1; // Adjust based on your backend logic
          const isPublic = false;

          const response = await dispatch(
            uploadFile({ file: image, tag, type, isPublic })
          ).unwrap();

          newMessageObject.imageUrl = response;
        } catch (error) {
          console.error("Image upload failed:", error);
          return;
        }
      }

      const updatedMessages = [...messages, newMessageObject];
      setMessages(updatedMessages);

      updateMessagesOnServer(updatedMessages);

      setMessage("");
      setImage(null);
      setSelectedImage(null);
    }
  };

  // Function to update messages on the server
  const updateMessagesOnServer = async (updatedMessages) => {
    try {
      // Assuming sendNewMessage action can be used to update the chat
      await dispatch(sendNewMessage({ code, newMessageSend: updatedMessages }));
    } catch (error) {
      console.error("Failed to update messages:", error);
      // Optionally handle the error (e.g., revert state, show notification)
    }
  };

  // Scroll to bottom when messages are updated
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSelectImage = (event) => {
    const file = event.target.files[0];
    setImage(file);
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);
    console.log(image);
  };

  const handleCancelSending = () => {
    setImage(null);
    setSelectedImage(null);
  };

  useEffect(() => {
    const imageUrls = messages
      .filter((msg) => msg.imageUrl)
      .map((msg) => msg.imageUrl);

    imageUrls.forEach((url) => {
      if (!imageCache[url]) {
        dispatch(fetchPrivateImage({ filename: url }))
          .unwrap()
          .then((imageData) => {
            setImageCache((prevCache) => ({
              ...prevCache,
              [url]: imageData,
            }));
          })
          .catch((error) => {
            console.error("Failed to fetch image:", error);
          });
      }
    });
  }, [messages, dispatch, imageCache]);

  useEffect(() => {
    if (step > 3) {
      setMoveForward(true);
    }
  }, [step]);

  const handleUserChoice = async (index) => {
    // Clone the current state of ConvertedImage
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
      await fetchUserChoiceImage;
      await increseingStep;
      handleNextStep();
    } catch (error) {
      console.error("Failed to dispatch user choice image:", error);
    }
  };

  return (
    <>
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
            {messages.length == 0 && (
              <p
                style={{ marginTop: "60px", marginBottom: "60px" }}
                className="discription text-center"
              >
                در حال حاضر پیامی وجود ندارد پیام خود را ارسال کنید
              </p>
            )}

            {Array.isArray(messages) &&
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`${
                    msg.isAdmin ? style.adminMessage : style.userMessage
                  }`}
                >
                  {msg.text && (
                    <div className={style.allTextStyle}>
                      <p className="discription">{msg.text}</p>
                      <div
                        className={`${
                          msg.isAdmin
                            ? style.adminDateStyle
                            : style.userDateStyle
                        } d-flex flex-row `}
                      >
                        <p className={`${style.TimeStyle} smallest`}>
                          {msg.date}
                        </p>
                        {msg.isAdmin == false && (
                          <div className="d-flex flex-row">
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
                    <>
                      {imageCache[msg.imageUrl] ? (
                        <>
                          {/* modal */}
                          <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <Box
                              component="img"
                              src={imageCache[msg.imageUrl]}
                              alt="uploaded"
                              className={style.modalStyleclass}
                              sx={ModalStyle}
                            ></Box>
                          </Modal>

                          <div className={style.allTextStyle}>
                            <Box
                              onClick={handleOpen}
                              className={`${style.imageChatStyle}`}
                              component="img"
                              src={imageCache[msg.imageUrl]}
                              alt="uploaded"
                            />
                            <div
                              className={`${
                                msg.isAdmin
                                  ? style.adminDateStyle
                                  : style.userDateStyle
                              } d-flex flex-row `}
                            >
                              <p className={`${style.TimeStyle} smallest`}>
                                {msg.date}
                              </p>
                              {msg.isAdmin == false && (
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
                        </>
                      ) : (
                        <p className="mt-1 mb-1">Loading image...</p>
                      )}
                    </>
                  )}
                </div>
              ))}
          </div>
        </div>

        {chatImage?.images.length > 0 ? (
          <>
            <div className={`mt-3 ${style.confirmImage} `}>
              {userChoiseImage ? (
                <div className="d-flex flex-row mb-2 mt-2 align-items-center">
                  <div>
                    <Box
                      onClick={() => handleZoomFinalPattern(userChoiseImage)}
                      className={`${style.imageChatStyle} `}
                      component="img"
                      src={userChoiseImage}
                      style={{ width: "200px", height: "100%" }}
                      alt="uploaded"
                    />
                  </div>
                  <p className="VodeoDisSizing me-2">طرح مورد تایید</p>
                </div>
              ) : (
                <>
                  {ConvertedImage?.allImages?.map((item, index) => (
                    <div className="d-flex flex-row mb-2 mt-2" key={index}>
                      <div>
                        <Box
                          onClick={() => handleZoomFinalPattern(item)}
                          className={`${style.imageChatStyle} `}
                          component="img"
                          src={item}
                          style={{ width: "100px", height: "100%" }}
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
                            onClick={() => handleUserChoice(index)}
                            className={`${style.confirmFirstButton} smallest`}
                          >
                            بله، مورد تایید است
                          </button>
                          <button
                            className={`${style.confirmSecondButton} smallest`}
                          >
                            نه، نیاز به تغییر دارد
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="position-relative mt-3 d-flex">
              {selectedImage ? (
                <>
                  <div
                    className={`${style.mainDivSelectedImage} d-flex flex-row align-items-center justify-content-between`}
                  >
                    <Box
                      component="img"
                      src={selectedImage}
                      alt="uploaded"
                      className={style.selectedImageForSend}
                    ></Box>
                    <div className="d-flex flex-column gap-2 ms-3">
                      <button
                        onClick={sendMessage}
                        className={`${style.sendMessageChatBox} smallest`}
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
                  </div>
                </>
              ) : (
                <>
                  <textarea
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="پیام خود را بنویسید"
                    className={`${style.inputChatBoxStyle} discription`}
                  />
                  {message.length == 0 && (
                    <>
                      <label
                        htmlFor="fileInputChatBox"
                        className={style.LabelFileUpload}
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
                </>
              )}
            </div>
          </>
        )}
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
            رد کردن
          </button>
        )}
      </div>
      {/* modals */}
      <AreYouShureModal
        open={openModal}
        onClose={closeModal}
        text={"ایا از حذف پیام مطمئن هستید ؟"}
        func={() => handleDeleteMessage(messageToDeleteIndex)}
      />
      <ZoomModal
        open={openModal2}
        onClose={closeModal2}
        src={openModal2}
        alt={`zoomModalImage`}
      />
    </>
  );
};

export default ChatBox;
