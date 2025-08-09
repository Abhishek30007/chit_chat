import React, { useState, useEffect } from "react";
import axios from "axios";
import { sendMessageRoute, getAllMessageRoute, setAvatarRoute } from "../utils/APIRoutes";

function ChatDemo({ currentUser, selectedUser }) {
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    async function fetchMessages() {
      if (currentUser && selectedUser) {
        const res = await axios.post(getAllMessageRoute, {
          from: currentUser._id,
          to: selectedUser._id,
        });
        setMessages(res.data);
      }
    }
    fetchMessages();
  }, [selectedUser, currentUser]);

  const sendMessage = async () => {
    if (msg.trim() && currentUser && selectedUser) {
      await axios.post(sendMessageRoute, {
        from: currentUser._id,
        to: selectedUser._id,
        message: msg,
      });
      setMsg("");
    }
  };

  const setAvatar = async (avatarImage) => {
    const user = JSON.parse(localStorage.getItem('users'));
    await axios.post(`${setAvatarRoute}/${user._id}`, {
      image: avatarImage,
    });
  };

  return (
    <div>
      <div>
        {messages.map((m, i) => (
          <div key={i}>{m.message}</div>
        ))}
      </div>
      <input
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default ChatDemo;