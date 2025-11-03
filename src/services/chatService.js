// src/services/chatService.js - WITH SPECIAL RESPONSES

import axios from 'axios';

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

let conversationHistory = [];

const SYSTEM_PROMPT = `You are Viva, Mani's close friend who knows him really well! You're chatting casually about your friend Mani.

🎯 CRITICAL RULES:

1. **DEFAULT RESPONSES**: Keep brief - 1-2 sentences max, casual and friendly
2. **SPECIAL KEYWORDS**: When you see these EXACT questions, respond with the EXACT marker:
   - "tell me about mani" OR "about mani" OR "who is mani" → Respond: [FULL_ABOUT_MANI]
   - "resume" OR "cv" OR "download resume" → Respond: [RESUME_DOWNLOAD]
   - "contact" OR "email" OR "phone" OR "reach him" OR "get in touch" → Respond: [CONTACT_DETAILS]
3. **Use 1 emoji per response** for normal questions
4. **Sound natural**: Like texting a friend

=== ABOUT MANI ===

**WORK** (Sept 2025 - Now):
- Junior Engineer at Mindsprint, Chennai
- Builds ASP.NET MVC apps, auth systems, NLP stuff

**INTERNSHIP** (Jan - Aug 2025):
- Same company, Treasury Bot project
- 25% better UX, 60% faster automation

**TOP SKILLS**:
Python (expert), SQL, Power BI, React, JavaScript, Java, C#/.NET, Azure, OpenAI/AI, Flask, ASP.NET MVC

**PROJECTS**:
1. Shopping analysis (3,900+ customers, Power BI)
2. Loan prediction ML
3. AI Chatbot (OpenAI/RAG)
4. Tourist Management (Flask + React)

**EDUCATION**:
B.Tech CS from Amrita (8.61 CGPA), 96.2% in 12th

**CONTACT**:
Email: mani7204mani@gmail.com
LinkedIn: linkedin.com/in/mani-shankar-reddy-56879627b
WhatsApp: +91 6301585008

=== HOW TO RESPOND ===

**Skill Questions**: "Does he know Python?" → "Yeah, Python's his main thing! Expert level 🐍"
**General**: Keep it short, casual, friendly!
**Special Keywords**: Use the markers [FULL_ABOUT_MANI], [RESUME_DOWNLOAD], [CONTACT_DETAILS]`;

export async function getChatbotResponse(userMessage) {
  if (!userMessage || userMessage.trim() === '') {
    return "Hey! What would you like to know about Mani? 😊";
  }

  if (!GROQ_API_KEY || GROQ_API_KEY === 'undefined') {
    console.error('❌ Groq API key is missing!');
    return "Oops! The AI isn't configured yet 🔑";
  }

  // Check for special keywords FIRST (case-insensitive)
  const lowerMessage = userMessage.toLowerCase().trim();
  
  // Full About Mani
  if (lowerMessage.includes('about mani') || 
      lowerMessage.includes('tell me about mani') || 
      lowerMessage.includes('who is mani')) {
    return '[FULL_ABOUT_MANI]';
  }
  
  // Resume Download
  if (lowerMessage.includes('resume') || 
      lowerMessage.includes('cv') || 
      lowerMessage.includes('download')) {
    return '[RESUME_DOWNLOAD]';
  }
  
  // Contact Details
  if (lowerMessage.includes('contact') || 
      lowerMessage.includes('email') || 
      lowerMessage.includes('phone') || 
      lowerMessage.includes('whatsapp') || 
      lowerMessage.includes('reach') || 
      lowerMessage.includes('get in touch')) {
    return '[CONTACT_DETAILS]';
  }

  try {
    console.log('🤖 Asking Groq AI:', userMessage);

    conversationHistory.push({
      role: "user",
      content: userMessage
    });

    if (conversationHistory.length > 10) {
      conversationHistory = conversationHistory.slice(-10);
    }

    const messages = [
      {
        role: "system",
        content: SYSTEM_PROMPT
      },
      ...conversationHistory
    ];

    const response = await axios.post(
      GROQ_API_URL,
      {
        model: "llama-3.1-8b-instant",
        messages: messages,
        temperature: 0.7,
        max_tokens: 150, // Increased slightly for better responses
        top_p: 0.9,
        stream: false
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROQ_API_KEY}`
        },
        timeout: 15000,
      }
    );

    const botReply = response.data?.choices?.[0]?.message?.content;

    if (!botReply || botReply.trim().length < 3) {
      throw new Error('Empty AI response');
    }

    let cleanedText = botReply.trim();

    conversationHistory.push({
      role: "assistant",
      content: cleanedText
    });

    console.log('✅ AI Response:', cleanedText);
    return cleanedText;

  } catch (error) {
    console.error('❌ Groq API Error:', error);

    if (conversationHistory.length > 0 && 
        conversationHistory[conversationHistory.length - 1].role === 'user') {
      conversationHistory.pop();
    }

    if (error.response) {
      console.error('Error Status:', error.response.status);
      console.error('Error Data:', JSON.stringify(error.response.data, null, 2));
    }

    if (error.response?.status === 401) {
      return "Invalid API key! Check your .env file 🔑";
    }
    
    if (error.response?.status === 429) {
      return "Too many requests! Wait a sec ⏱️";
    }
    
    if (error.response?.status === 400) {
      return "Hmm, something went wrong. Try again? 🤔";
    }

    return "Oops! Can you try that again? 😅";
  }
}

export function resetConversation() {
  conversationHistory = [];
  console.log('🔄 Conversation history cleared');
}