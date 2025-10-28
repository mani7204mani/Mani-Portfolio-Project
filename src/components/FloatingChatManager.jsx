// src/components/FloatingChatManager.jsx (Rename this file)

import React, { useState } from 'react';
import ChatInterface from './ChatInterface'; // 💡 NEW IMPORT 💡
import '../styles/FloatingChatButton.css'; 

function FloatingChatManager() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => setIsChatOpen(!isChatOpen);
  
  // Your WhatsApp details (kept for context, but now the ChatInterface handles the main action)
  
  return (
    <>
      {/* 1. The floating button (always visible) */}
      <button 
        onClick={toggleChat} 
        className="floating-chat-btn"
        aria-label="Open Chatbot"
      >
        {/* Replace this with your chatbot icon (e.g., /chatbot-icon.svg) */}
        {isChatOpen ? <span className="close-x">&times;</span> : '🤖'}
      </button>

      {/* 2. The main chat interface (conditionally rendered) */}
      <ChatInterface isOpen={isChatOpen} toggleChat={toggleChat} />
    </>
  );
}

export default FloatingChatManager;