"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import data from "/public/json/chatBoxFakeData.json";
import style from "/src/app/Styles/Profile/MakeOrderStyle/Talkjs.module.scss";
import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";

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

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [image, setImage] = useState(null);
  const [userRole] = useState("user");
  const chatBoxRef = useRef(null); // Ref to access the chat container

  // modal part state and function
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchMessages = async () => {
    // const res = await axios.get("http://localhost:3000/messages");
    // setMessages(res.data);

    setMessages(data);
  };

  const sendMessage = async () => {
    const formData = new FormData();
    formData.append("message", message);
    formData.append("isAdmin", userRole === "admin");
    if (image) formData.append("image", image);

    await axios.post("http://localhost:3000/messages", formData);
    setMessage("");
    setImage(null);
    fetchMessages();
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Scroll to bottom when messages are updated
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className={style.stepContent}>
      <div className={style.mainChatBox}>
        <div
          className={`${style.headerChatBox} d-flex flex-row justify-content-between`}
        >
          <div>
            <p className="discription">اسم محصول پایه</p>
          </div>
          <div className="discription">#235486</div>
        </div>

        {/* Scrollable chat area */}
        <div className={`${style.chatContainer} container`} ref={chatBoxRef}>
          {messages.map((msg, index) => (
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
                      msg.isAdmin ? style.adminDateStyle : style.userDateStyle
                    } d-flex flex-row `}
                  >
                    <p className={`${style.TimeStyle} smallest`}>{msg.date}</p>
                    {msg.isAdmin == false && (
                      <div className="d-flex flex-row">
                        <svg
                          className={style.editIconStyle}
                          width="18"
                          height="17"
                          viewBox="0 0 25 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.7599 3.59924L5.54985 12.2892C5.23985 12.6192 4.93985 13.2692 4.87985 13.7192L4.50985 16.9592C4.37985 18.1292 5.21985 18.9292 6.37985 18.7292L9.59985 18.1792C10.0499 18.0992 10.6799 17.7692 10.9899 17.4292L19.1999 8.73924C20.6199 7.23924 21.2599 5.52924 19.0499 3.43924C16.8499 1.36924 15.1799 2.09924 13.7599 3.59924Z"
                            stroke="#292D32"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M12.3901 5.05078C12.8201 7.81078 15.0601 9.92078 17.8401 10.2008"
                            stroke="#292D32"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M3.5 22H21.5"
                            stroke="#292D32"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        <svg
                          className={style.editIconStyle}
                          width="18"
                          height="17"
                          viewBox="0 0 25 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21.5 5.98047C18.17 5.65047 14.82 5.48047 11.48 5.48047C9.5 5.48047 7.52 5.58047 5.54 5.78047L3.5 5.98047"
                            stroke="#292D32"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M9 4.97L9.22 3.66C9.38 2.71 9.5 2 11.19 2H13.81C15.5 2 15.63 2.75 15.78 3.67L16 4.97"
                            stroke="#292D32"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M19.3499 9.14062L18.6999 19.2106C18.5899 20.7806 18.4999 22.0006 15.7099 22.0006H9.2899C6.4999 22.0006 6.4099 20.7806 6.2999 19.2106L5.6499 9.14062"
                            stroke="#292D32"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M10.8301 16.5H14.1601"
                            stroke="#292D32"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M10 12.5H15"
                            stroke="#292D32"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {msg.imageUrl && (
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
                      src={msg.imageUrl}
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
                      src={msg.imageUrl}
                      alt="uploaded"
                    />
                    <div
                      className={`${
                        msg.isAdmin ? style.adminDateStyle : style.userDateStyle
                      } d-flex flex-row `}
                    >
                      <p className={`${style.TimeStyle} smallest`}>
                        {msg.date}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="position-relative mt-3">
        <textarea
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="پیام خود را بنویسید"
          className={`${style.inputChatBoxStyle} discription`}
        />
        <label htmlFor="fileInputChatBox" className={style.LabelFileUpload}>
          <svg
            width="27"
            height="27"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.5 7.5H15.7924C18.3773 7.5 20.5 9.52091 20.5 12C20.5 14.4709 18.3859 16.5 15.7924 16.5H14.5"
              stroke="#292D32"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9.5 16.5H8.21429C5.61714 16.5 3.5 14.4791 3.5 12C3.5 9.52909 5.61714 7.5 8.21429 7.5H9.5"
              stroke="#292D32"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8.5 12H15.5"
              stroke="#292D32"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </label>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          accept="image/*"
          className={`d-none`}
          id="fileInputChatBox"
        />
        <button
          onClick={sendMessage}
          className={`${style.sendMessageChatBox} discription`}
        >
          ارسال
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
