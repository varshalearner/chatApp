import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { response } from 'express';

const ChatPage = () => {
  const [chats, setChats] = useState([]);

  const fetchChats = async () => {
    try {
      const response = await axios.get('/api/chats'); 
      console.log("Hitting the API");
      console.log(response.data);
      setChats(response.data);
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };

  useEffect(() => {
    fetchChats();
    // axios.get('/api/chats')
    // .then((response)=>{
    //   setChats(response.data);
    // })
    // .catch((error)=>{
    //   console.log(error);
    // })
  }, []);

  return (
    <div>
      <h1>Chat Page</h1>
      {chats.map((chat) => (
        <div key={chat._id}>{chat.chatName}</div>
      ))}
    </div>
  );
};

export default ChatPage;
