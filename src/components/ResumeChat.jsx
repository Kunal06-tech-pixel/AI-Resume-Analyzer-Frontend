import { useState, useEffect, useRef } from 'react';
import axios from '../services/axios';
import MarkdownMessage from './MarkdownMessage';
import './ResumeChat.css';

const ResumeChat = ({ analysisId, fileName, isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatId, setChatId] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (analysisId && isOpen) {
      loadChatHistory();
    }
  }, [analysisId, isOpen]);

  const loadChatHistory = async () => {
    try {
      const response = await axios.get(`/api/chat/${analysisId}/history`);
      if (response.data.success && response.data.chat) {
        setMessages(response.data.chat.messages);
        setChatId(response.data.chat.id);
      }
    } catch (error) {
      console.error('Failed to load chat history:', error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');

    // Add user message to UI immediately
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await axios.post(`/api/chat/${analysisId}/message`, {
        message: userMessage
      });

      if (response.data.success) {
        // Add assistant response
        setMessages(prev => [...prev, response.data.message]);
        setChatId(response.data.chat.id);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestedQuestions = [
    "How can I improve my ATS score?",
    "What are my resume's main weaknesses?",
    "Which skills should I add?",
    "How does my experience match the job?",
    "What makes my resume strong?"
  ];

  const handleSuggestedQuestion = (question) => {
    setInputMessage(question);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="chat-backdrop" onClick={onClose}></div>

      {/* Chat Popup */}
      <div className="chat-popup">
        <div className="resume-chat">
          <div className="chat-header">
            <div>
              <h3>💬 Chat About Your Resume</h3>
              <p className="chat-subtitle">{fileName}</p>
            </div>
            <button className="chat-close-btn" onClick={onClose}>
              ✕
            </button>
          </div>

          <div className="chat-messages">
            {messages.length === 0 ? (
              <div className="chat-welcome">
                <h4>👋 Hi! I'm your resume advisor</h4>
                <p>Ask me anything about your resume analysis, ATS score, or how to improve it.</p>
                
                <div className="suggested-questions">
                  <p className="suggested-label">Try asking:</p>
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      className="suggested-question"
                      onClick={() => handleSuggestedQuestion(question)}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`message ${msg.role === 'user' ? 'user-message' : 'assistant-message'}`}
                  >
                    <div className="message-avatar">
                      {msg.role === 'user' ? '👤' : '🤖'}
                    </div>
                    <div className="message-content">
                      <div className="message-text">
                        {msg.role === 'assistant' ? (
                          <MarkdownMessage content={msg.content} />
                        ) : (
                          msg.content
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="message assistant-message">
                    <div className="message-avatar">🤖</div>
                    <div className="message-content">
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="chat-input-form" onSubmit={sendMessage}>
            <input
              type="text"
              className="chat-input"
              placeholder="Ask about your resume..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              disabled={isLoading}
            />
            <button
              type="submit"
              className="chat-send-btn"
              disabled={!inputMessage.trim() || isLoading}
            >
              {isLoading ? '⏳' : '📤'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResumeChat;
