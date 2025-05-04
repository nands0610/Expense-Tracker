import React, { useState } from "react";
import "./Chatbot.css";

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className="chatbot-toggle" onClick={toggleChatbot}>
        💬
      </button>
      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <h5>AI Chatbot</h5>
            <button className="close-btn" onClick={toggleChatbot}>
              ✖
            </button>
          </div>
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/1aR-qoOqmdwfj4oOG4OSA"
            width="100%"
            style={{ height: 700, border: "none", minHeight: 700 }}
            frameBorder="0"
            title="Chatbot"
          ></iframe>
        </div>
      )}
    </>
  );
};

export default Chatbot;