import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ChatPage from "./pages/ChatPage";

const App = () => {
  return (
    <div>
      <Routes>
      <Route path="/" Component={Homepage} exact/>   
      <Route path="/chats" Component={ChatPage} exact/>   
      </Routes>
        
    </div>
  );
};

export default App;
