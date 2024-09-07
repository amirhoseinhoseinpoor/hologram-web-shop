"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import data from "/public/json/chatBoxFakeData.json";
import style from "/src/app/Styles/Profile/MakeOrderStyle/Talkjs.module.scss";
import { Box } from "@mui/material";

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [image, setImage] = useState(null);
  const [userRole] = useState("user");
  const chatBoxRef = useRef(null); // Ref to access the chat container

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
                </div>
              )}

              {msg.imageUrl && (
                <>
                  <Box
                    className={`mt-2 ${style.imageChatStyle}`}
                    component="img"
                    src={msg.imageUrl}
                    alt="uploaded"
                  />
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
        <button onClick={sendMessage} className={`${style.sendMessageChatBox} discription`}>ارسال</button>
      </div>
    </div>
  );
};

export default ChatBox;
