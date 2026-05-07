import { useState } from 'react';
import ResumeChat from './ResumeChat';
import './ResumeChat.css';

const FloatingChatButton = ({ analysisId, fileName }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  if (!analysisId) return null;

  return (
    <>
      {/* Floating Chat Button */}
      <button
        className="floating-chat-btn"
        onClick={() => setIsChatOpen(true)}
        title="Chat about your resume"
      >
        💬
      </button>

      {/* Chat Popup */}
      <ResumeChat
        analysisId={analysisId}
        fileName={fileName}
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </>
  );
};

export default FloatingChatButton;
