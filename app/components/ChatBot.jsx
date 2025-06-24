"use client"
import React, { useState, useEffect } from 'react';

const SYSTEM_PROMPT = `You are a medical assistant for a symptom-checker application.

**Rules:**
- Do not express sympathy, concern, or politeness.
- Do not explain that you are an AI.
- Do not recommend seeing a doctor unless adding the provided short disclaimer at the end.
- Only ask up to 2 short follow-up questions if needed.
- After receiving answers, suggest medicines from the product list if relevant.
- Responses must be short and only in clean HTML using <p>, <ul>, <li>, <strong>, and <br> tags.
- Do not include extra phrases like "I understand", "It sounds like", "As an AI", etc.
`;

const ChatBot = () => {
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [systemPromptSent, setSystemPromptSent] = useState(false);
  const [initialSymptoms, setInitialSymptoms] = useState("");
  const [waitingForSystemPrompt, setWaitingForSystemPrompt] = useState(false);

  // Add welcome message when chat is opened
  useEffect(() => {
    if (isChatbotVisible && messages.length === 0) {
      setMessages([
        { sender: "ai", text: "Hello! What medical issue or symptoms are you facing at this time?" }
      ]);
    }
  }, [isChatbotVisible]);

  // Automatically send system prompt when chat is opened
  useEffect(() => {
    if (isChatbotVisible && !systemPromptSent) {
      setLoading(true);
      setWaitingForSystemPrompt(true);
      fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: SYSTEM_PROMPT.replace('{insert user symptoms here}', '') }),
      })
        .then(() => {
          setSystemPromptSent(true);
        })
        .finally(() => {
          setLoading(false);
          setWaitingForSystemPrompt(false);
        });
    }
  }, [isChatbotVisible, systemPromptSent]);

  const toggleChatbotVisibility = () => {
    setIsChatbotVisible(!isChatbotVisible);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    let promptToSend = input;
    if (initialSymptoms) {
      promptToSend = `User's symptoms: ${initialSymptoms}\nFollow-up: ${input}`;
    }
    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: promptToSend }),
      });
      const data = await res.json();
      if (data.result) {
        setMessages((prev) => [...prev, { sender: "ai", text: data.result, isHtml: true }]);
      } else {
        setMessages((prev) => [...prev, { sender: "ai", text: "Error: " + (data.error || "No response") }]);
      }
    } catch (err) {
      setMessages((prev) => [...prev, { sender: "ai", text: "Request failed" }]);
    }
    setLoading(false);
    // Save initial symptoms if not already set
    if (!initialSymptoms) setInitialSymptoms(input);
  };

  return (
    <>
      <div
        style={{
          position: 'fixed',
          bottom: '90px',
          left: '10px',
          zIndex: 1000,
          cursor: 'pointer',
          backgroundColor: '#1a1a1a',
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
            zIndex: 999,
            width: '400px',
            height: '600px',
            background: 'white',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <div style={{ flex: 1, padding: 16, overflowY: 'auto' }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{ margin: '8px 0', textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
                {msg.sender === 'ai' && msg.isHtml ? (
                  <span style={{
                    display: 'inline-block',
                    background: '#e5e7eb',
                    color: '#111827',
                    borderRadius: 12,
                    padding: '8px 12px',
                    maxWidth: '80%',
                    wordBreak: 'break-word',
                  }}
                    dangerouslySetInnerHTML={{ __html: msg.text }}
                  />
                ) : (
                  <span style={{
                    display: 'inline-block',
                    background: msg.sender === 'user' ? '#2563eb' : '#e5e7eb',
                    color: msg.sender === 'user' ? 'white' : '#111827',
                    borderRadius: 12,
                    padding: '8px 12px',
                    maxWidth: '80%',
                    wordBreak: 'break-word',
                  }}>{msg.text}</span>
                )}
              </div>
            ))}
            {(loading || waitingForSystemPrompt) && <div style={{ color: '#888', textAlign: 'center', marginTop: 16 }}>Gemini is preparing your medical assistant...</div>}
          </div>
          <form onSubmit={sendMessage} style={{ display: 'flex', borderTop: '1px solid #eee' }}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={waitingForSystemPrompt ? "Please wait..." : "Type your message..."}
              style={{ flex: 1, padding: 12, border: 'none', outline: 'none' }}
              disabled={loading || waitingForSystemPrompt}
            />
            <button type="submit" style={{ padding: '0 16px', background: '#2563eb', color: 'white', border: 'none', borderRadius: 0 }} disabled={loading || waitingForSystemPrompt}>
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatBot;