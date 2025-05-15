"use client"
import React, { useState } from 'react';
const ChatBot = () => {
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);

  const toggleChatbotVisibility = () => {
    setIsChatbotVisible(!isChatbotVisible);
  };

  return (
    <>
      <div
        style={{
          position: 'fixed',
          bottom: '90px',
          left: '10px',
          zIndex: 1000, // Ensure it's on top of other elements
          cursor: 'pointer',
          backgroundColor: '#1a1a1a', // Example bubble color
          color: 'white',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
        }}
        onClick={toggleChatbotVisibility}
        className='animate-pulse mb-[50dvh]'
      >
        Chat
      </div>

      {isChatbotVisible && (
        <div
          style={{
            position: 'fixed',
            bottom: '80px',
            right: '20px',
            zIndex: 999, // Below the bubble but above other content
            width: '400px',
            height: '600px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/2_bSJIYVlx6ZfOOHWCxgw"
            width="100%"
            style={{ height: '100%', minHeight: '700px' }}
          ></iframe>
        </div>
      )}
    </>
  );
};

export default ChatBot;