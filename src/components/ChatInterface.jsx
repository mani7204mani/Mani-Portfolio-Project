// src/components/ChatInterface.jsx - WITH SPECIAL RESPONSE HANDLING

import React, { useState, useEffect, useRef } from 'react';
import { getChatbotResponse, resetConversation } from '../services/chatService';
import '../styles/ChatInterface.css';

function ChatInterface({ isOpen, onClose }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          type: 'bot',
          content: "Hey! I'm Viva, Mani's friend! 👋 What would you like to know about him?",
          showQuickActions: true,
        },
      ]);
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');

    setMessages((prev) => [...prev, { type: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const botReply = await getChatbotResponse(userMessage);
      
      // Check for special markers and create appropriate message objects
      if (botReply === '[FULL_ABOUT_MANI]') {
        setMessages((prev) => [
          ...prev,
          { type: 'bot', content: 'aboutMani', isSpecial: true },
        ]);
      } else if (botReply === '[RESUME_DOWNLOAD]') {
        setMessages((prev) => [
          ...prev,
          { type: 'bot', content: 'resume', isSpecial: true },
        ]);
      } else if (botReply === '[CONTACT_DETAILS]') {
        setMessages((prev) => [
          ...prev,
          { type: 'bot', content: 'contact', isSpecial: true },
        ]);
      } else {
        setMessages((prev) => [...prev, { type: 'bot', content: botReply }]);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        { type: 'bot', content: 'Oops! Something went wrong. Try again? 😅' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (action) => {
    setInputValue(action);
    setTimeout(() => {
      document.querySelector('.chat-input-field')?.focus();
    }, 100);
  };

  const handleReset = () => {
    resetConversation();
    setMessages([
      {
        type: 'bot',
        content: "Hey! I'm Viva, Mani's friend! 👋 What would you like to know about him?",
        showQuickActions: true,
      },
    ]);
  };

  // Render special content based on type
  const renderSpecialContent = (contentType) => {
    if (contentType === 'aboutMani') {
      return (
        <div className="about-mani-section">
          <p>
            <strong>🚀 Current Role:</strong>
            Junior Engineer at Mindsprint, Chennai (Sept 2025 - Present). Building ASP.NET MVC apps, authentication systems, and NLP solutions!
          </p>
          <p>
            <strong>💼 Internship:</strong>
            Same company (Jan - Aug 2025). Worked on Treasury Bot - improved UX by 25% and automation speed by 60%!
          </p>
          <p>
            <strong>🛠️ Top Skills:</strong>
            Python (Expert), SQL, Power BI, React, JavaScript, Java, C#/.NET, Azure, OpenAI/AI, Flask, ASP.NET MVC
          </p>
          <p>
            <strong>📊 Cool Projects:</strong>
            Shopping analysis (3,900+ customers), Loan prediction ML, AI Chatbot with RAG, Tourist Management app
          </p>
          <p>
            <strong>🎓 Education:</strong>
            B.Tech CS from Amrita University (8.61 CGPA), 96.2% in 12th grade
          </p>
        </div>
      );
    }

    if (contentType === 'resume') {
      return (
        <div className="resume-section">
          <p style={{ marginBottom: '10px' }}>
            📄 Here's Mani's resume! Click below to download:
          </p>
          <a
            href="/resume.pdf"
            download="Mani_Shankar_Reddy_Resume.pdf"
            className="action-btn resume-btn"
          >
            📥 Download Resume
          </a>
        </div>
      );
    }

    if (contentType === 'contact') {
      return (
        <div className="contact-section">
          <p style={{ marginBottom: '10px' }}>
            📞 Here's how you can reach Mani:
          </p>
          <div className="contact-buttons">
            <a
              href="mailto:mani7204mani@gmail.com"
              className="action-btn email-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              ✉️ Email: mani7204mani@gmail.com
            </a>
            <a
              href="https://linkedin.com/in/mani-shankar-reddy-56879627b"
              className="action-btn linkedin-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              💼 LinkedIn Profile
            </a>
            <a
              href="https://wa.me/916301585008"
              className="action-btn whatsapp-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              💬 WhatsApp: +91 6301585008
            </a>
          </div>
        </div>
      );
    }

    return null;
  };

  if (!isOpen) return null;

  return (
    <div className="chat-box">
      <div className="chat-header">
        <span>💬 Chat with Viva</span>
        <button className="chat-close-btn" onClick={onClose} aria-label="Close chat">
          ×
        </button>
      </div>

      <div className="chat-body">
        {messages.map((msg, index) => (
          <div key={index} className={`message-wrapper ${msg.type}`}>
            {msg.type === 'user' ? (
              <div className="user-message">{msg.content}</div>
            ) : msg.isSpecial ? (
              <div className="bot-message">
                {renderSpecialContent(msg.content)}
              </div>
            ) : (
              <div className="bot-message">{msg.content}</div>
            )}
          </div>
        ))}

        {messages.length > 0 && messages[0].showQuickActions && messages.length === 1 && (
          <div className="quick-actions">
            <div className="quick-actions-label">Quick questions:</div>
            <button className="quick-btn" onClick={() => handleQuickAction('Tell me about Mani')}>
              👤 Tell me about Mani
            </button>
            <button className="quick-btn" onClick={() => handleQuickAction('Download resume')}>
              📄 Download Resume
            </button>
            <button className="quick-btn" onClick={() => handleQuickAction('Contact details')}>
              📞 Contact Details
            </button>
          </div>
        )}

        {isLoading && (
          <div className="message-wrapper bot">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}

        {messages.length > 2 && (
          <button className="reset-chat-btn" onClick={handleReset}>
            🔄 Start New Conversation
          </button>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-container">
        <form className="chat-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="chat-input-field"
            placeholder="Ask me anything about Mani..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isLoading}
          />
          <button type="submit" className="chat-submit-btn" disabled={isLoading || !inputValue.trim()}>
            {isLoading ? '...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatInterface;