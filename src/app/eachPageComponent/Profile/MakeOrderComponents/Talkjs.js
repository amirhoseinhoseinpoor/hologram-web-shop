"use client"

import React, { useState, useEffect } from 'react';
import Pusher from 'pusher-js';


const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  

  useEffect(() => {

    Pusher.logToConsole = true;

    const pusher = new Pusher('38d9648bb511a3932387', {
      cluster: 'ap2',
    });

    const channel = pusher.subscribe('chat');
    channel.bind('message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data.message]);
    });

    return () => {
      pusher.unsubscribe('chat');
    };
  }, []);

  const sendMessage = () => {
    // Send the message to your server and trigger a Pusher event
    // console.log(messages);
    // console.log(newMessage);
    
    
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;




  // // Enable pusher logging - don't include this in production
  

  // var pusher = new Pusher('38d9648bb511a3932387', {
  //   cluster: 'ap2'
  // });

  // var channel = pusher.subscribe('my-channel');
  // channel.bind('my-event', function(data) {
  //   alert(JSON.stringify(data));
  // });